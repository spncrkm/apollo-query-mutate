
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PostListPage from './components/PostListPage'
import FilterPostsByUser from './components/FilteredPostsByUser'
import CreatePost from './components/CreatePost'
import UpdatePost from './components/UpdatePost'

const App: React.FC = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PostListPage/>}/>
          <Route path='/user' element={<FilterPostsByUser />}/>
          <Route path="/create-post" element={<CreatePost/>} />
        <Route path="/update-post" element={<UpdatePost/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
