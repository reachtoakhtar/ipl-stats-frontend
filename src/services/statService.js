/**
 * Created by Akhtar on 01/07/2019.
 */


import http from "./httpService";

const statApiEndpoint = "/ipl_stat/stats/";
const lookupApiEndpoint = "/ipl_stat/lookups/";


export function create_lookup() {
  return http.post(lookupApiEndpoint, {});
}

export function getStats(season) {
  console.log(season)
  season = undefined ? "2008" : season
  return http.get(statApiEndpoint, {
    params: {season}
  });
}
