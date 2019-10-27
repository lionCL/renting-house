import { createStore } from 'redux'

//导入reducer
import reducer from './reducer'

//创建仓库
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
//导出仓库
export default store
