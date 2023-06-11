import neo4j, { Node, Relationship, Integer } from 'neo4j-driver'
import { list } from 'postcss';


interface PersonProperties {
    name: string;
  }

type PersonNode = Node<Integer, PersonProperties>

type Relation = Relationship<Integer,{
    type: string;
}>

export interface Graph{
    nodeList: any[],
    relationshipList: any[]
}


interface Person{
    identity: Integer,
    labels: String[],
    properties: PersonProperties,
    elementId: String
}


export async function main(): Promise<Graph> {
    // Create a Driver Instance
    const driver = neo4j.driver(
      'neo4j+s://b3c4a146.databases.neo4j.io', //TODO: Move to secrets
      neo4j.auth.basic('neo4j', 'h3yvQfwy081NdPjCOPLbolST_68Q6UfLuo_aFBoyRO0')
    )
  
    // Open a new Session
    const session = driver.session()
  
    try {
      // Execute a Cypher statement in a Read Transaction
      const nodesRes = await session.executeRead(tx => tx.run(`MATCH (n) RETURN n;`))
      const relationRes = await session.executeRead(tx => tx.run(`MATCH (n) OPTIONAL MATCH (n)-[r]-() RETURN r;`))

    
      const persons = await nodesRes.records.map(node => node.get('n'))
      

      const rawRelationships = await relationRes.records.map(relation => relation.get('r'))

      const graph:Graph = {
        nodeList: persons,
        relationshipList: rawRelationships
      }

      return graph;

    
      

    }
    finally {
      // Close the Session
      await session.close()
    }
    
  }

export async function formatGraphData(){

    const graph = await main()
    const nodes = graph.nodeList
    const rawRelationship = graph.relationshipList

    const relationships = await rawRelationship.map(relationship =>{
        const start = findRelationshipStart(relationship, nodes);
        const end = findRelationshipEnd(relationship, nodes);
        return({
            type: relationship.type,
            start:start,
            end: end
        })
    
    })


        return {
            nodeList: nodes,
            relationships: relationships
        }
}




function findRelationshipStart(relation: any, listOfNodes: any[]): any{

    let name

    listOfNodes.forEach(node => {
      if(isIdentityEqual(relation.start, node.identity)){
      name = node.properties.name}
      else{
        "Shit"
      }
      
    });
    return name;
  }

  function findRelationshipEnd(relation: any, listOfNodes: any[]): any{

    let name 
    listOfNodes.forEach(node => {
      if(isIdentityEqual(relation.end, node.identity)){
      name = node.properties.name}
      else{
        return "shit"
      }
    });

    return name
  }

  function isIdentityEqual(relationshipId,nodeId){
    if(relationshipId.low == nodeId.low && relationshipId.high == nodeId.high){
      return true
    }
    
  }
