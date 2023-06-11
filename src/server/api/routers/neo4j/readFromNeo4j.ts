import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {main, Graph, formatGraphData} from "neo4j/neo4j"





export const graphRouter = createTRPCRouter({
  getAllData: publicProcedure
    .query(async (data) => { const graph = await formatGraphData().then(data => data);
    return graph})
});



