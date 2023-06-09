import neo4j, { Node, Relationship, Integer } from 'neo4j-driver'


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
      const nodesRes = await session.executeRead(tx => tx.run<PersonNode>(`MATCH (n) RETURN n;`))
      const relationRes = await session.executeRead(tx => tx.run<Relation>(`MATCH (n) OPTIONAL MATCH (n)-[r]-() RETURN r;`))

    
      const persons = nodesRes.records.map(node => node.get('n'))
      

      const relationships = relationRes.records.map(relation => relation.get('r'))

      const graph:Graph = {
        nodeList: persons,
        relationshipList: relationships
      }

      return graph;

    
      

    }
    finally {
      // Close the Session
      await session.close()
    }
    
  }