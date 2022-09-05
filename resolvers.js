import { Character, Skill, Weapon, Staff, Item, Accessory, Beorc, Laguz, Affinity } from "./models/fe9Schemas.js";


export const resolvers = {
    Class:{
      __resolveType(obj) {
        if(obj.race==="Beorc"){
          return 'Beorc'
        }
        if(obj.race==="Laguz"){
          return 'Laguz'
        }
        return null
      }
    },
    Top:{
      __resolveType(obj) {
        if(obj.might){
          return 'Weapon'
        }
        if(obj.experience){
          return 'Staff'
        }
        return null
      }
    },
    Bottom:{
      __resolveType(obj) {
        if(obj.uses){
          return 'Item'
        }
        if(obj.effect){
          return 'Accessory'
        }
        return null
      }
    },
    Query: {
      async getCharacters(_, {input}) {
        if (input){
          let entries = []
          let firstFields = Object.keys(input)
          for (let i = 0; i < firstFields.length; i++){
            let nestedObject = input[firstFields[i]]
            if (typeof(nestedObject) !== 'object'){
              let key = `${firstFields[i]}`
              let value = input[firstFields[i]]
              let entry = {[key]:value}
              entries.push(entry)
              continue
            }
            let secondFields = Object.keys(nestedObject)
            for (let j = 0; j < secondFields.length; j++){
              let value = input[firstFields[i]][secondFields[j]];
              let key = `${firstFields[i]}.${secondFields[j]}`
              let entry = {[key]:value}
              entries.push(entry)
            }
          }
        let fetch  = entries.reduce((r, o) => Object.assign(r, o), {});
        let result = await Character.find(fetch)
        return result
        }
        let result = await Character.find(input)
        return result
      },
      async filterCharacters(_, {input}){
        console.log(input)
        let entries = []
          let firstFields = Object.keys(input)
          for (let i = 0; i < firstFields.length; i++){
            let nestedObject = input[firstFields[i]]
            console.log(nestedObject)
            let secondFields = Object.keys(nestedObject)
            for (let j = 0; j < secondFields.length; j++){
              let secondObject = nestedObject[secondFields[i]]
              console.log(secondObject)
              if (typeof(secondObject) !== 'object'){
                let firstKey = `${firstFields[i]}`
                let secondKey = `$${secondFields[j]}`
                let value = nestedObject[secondFields[j]]
                let entry = {[firstKey]:{[secondKey]:value}}
                entries.push(entry)
                continue
              }
              let thirdFields = Object.keys(secondObject)
              for (let k = 0; k < thirdFields.length; k++){
                let firstKey = `${firstFields[i]}.${secondFields[j]}`
                let secondKey = `$${thirdFields[k]}`
                let value = secondObject[thirdFields[k]]
                let entry = {[firstKey]:{[secondKey]:value}}
                entries.push(entry)
              }
                }
            
          }
          console.log(entries)
        let fetch  = entries.reduce((r, o) => Object.assign(r, o), {});
        console.log(fetch)
        let result = await Character.find(fetch)
        return result
      },
      getSkills: async (_, arg) => await Skill.find(arg.input),
      getWeapons: async (_, arg) => await Weapon.find(arg.input),
      getStaves: async (_, arg) => await Staff.find(arg.input),
      getItems: async (_, arg) => await Item.find(arg.input),
      getAccessories: async (_, arg) => await Accessory.find(arg.input),
      getBeorcClasses: async (_, arg) => await Beorc.find(arg.input),
      getLaguzClasses: async (_, arg) => await Laguz.find(arg.input),
      getAffinities: async (_, arg) => await Affinity.find(arg.input),
      },
    // Character: {
    //   baseStats(character,{input}){
    //     console.log(input)
    //     return character.baseStats
    //   }
    // }
  };