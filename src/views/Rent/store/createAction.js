import { SAVE_COMMUNITY, GET_COMMUNITY } from './actionType'

// **
//  * actionCreator 中返回的都是action对象
//  * 其中 action 对象的 type是必须的
//  */

export const saveCommunity = community => {
  return {
    type: SAVE_COMMUNITY,
    community
  }
}

export const getCommunity = () => {
  return {
    type: GET_COMMUNITY
  }
}
