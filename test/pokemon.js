import { expect } from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";
const request = supertest("https://pokeapi.co/api/v2/");
const endpointList = [];
const normalPokemonList = [];

describe("Pokemon", () => {
  it("Get Normal Pokemon", () => {
    const endpoint = "pokemon?limit=30";
    return request.get(endpoint).then((res) => {
      expect(res.body.results).to.not.be.empty;
      res.body.results.forEach((results) => {
        let newURL = results.url;
        let newEndpoint = newURL.split("v2/").pop();
        endpointList.push(newEndpoint);
        // console.log(endpointList);
      });
      endpointList.forEach((endpointList) => {
        return request.get(endpointList).then((res) => {
          res.body.types.forEach((types) => {
            let typeName = types.type.name;
            if (typeName === "normal") {
              console.log(res.body.id + " " + res.body.name + " is normal");
              normalPokemonList.push(res.body.id + " " + res.body.name);
              console.log(normalPokemonList);
            }
          });
        });
      });
    });
  });
});
