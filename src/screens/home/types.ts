import program from "../../data/program.json";

export type Program = typeof program;
export type Tier = Program["tiers"][number];
