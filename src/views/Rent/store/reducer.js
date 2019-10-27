import { SAVE_COMMUNITY, GET_COMMUNITY } from './actionType'

// reducer就是一个纯函数，处理完结果之后，一定要返回新的state

export default (state = {}, action) => {
  switch (action.type) {
    case SAVE_COMMUNITY:
      state = action.community
      return state

    case GET_COMMUNITY:
      return state

    default:
      return state
  }
}
