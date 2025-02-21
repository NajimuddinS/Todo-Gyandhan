import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('low')
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    priority: 'low'
  })

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://todo-gyandhyan.onrender.com/api/todos')
      const data = await response.json()
      setTodos(data)
    } catch (error) {
      console.error('Error fetching todos:', error)

      setTodos([
        {
          _id: '1',
          title: 'Sample Todo',
          description: 'This is a sample todo',
          priority: 'high',
          createdAt: new Date().toISOString()
        }
      ])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return

    const newTodo = {
      title,
      description,
      priority,
      createdAt: new Date().toISOString()
    }

    try {
      const response = await fetch('https://todo-gyandhyan.onrender.com/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo)
      })
      const data = await response.json()
      
      // Mock response since we're frontend only
      const mockResponse = {
        ...newTodo,
        _id: Date.now().toString()
      }
      
      setTodos([...todos, mockResponse])
      setTitle('')
      setDescription('')
      setPriority('low')
    } catch (error) {
      console.error('Error creating todo:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`https://todo-gyandhyan.onrender.com/api/todos${id}`, {
        method: 'DELETE'
      })
      setTodos(todos.filter(todo => todo._id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const handleEdit = (todo) => {
    setEditId(todo._id)
    setEditData({
      title: todo.title,
      description: todo.description,
      priority: todo.priority
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!editData.title.trim() || !editData.description.trim()) return

    try {
      const response = await fetch(`https://todo-gyandhyan.onrender.com/api/todos${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData)
      })
      
      setTodos(todos.map(todo => 
        todo._id === editId ? { ...todo, ...editData } : todo
      ))
      setEditId(null)
      setEditData({
        title: '',
        description: '',
        priority: 'low'
      })
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high'
      case 'moderate': return 'priority-moderate'
      case 'low': return 'priority-low'
      default: return ''
    }
  }

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="todo-input"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="todo-textarea"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="todo-select"
          >
            <option value="low">Low Priority</option>
            <option value="moderate">Moderate Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>
        <button type="submit" className="add-button">Add Todo</button>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className={`todo-item ${getPriorityColor(todo.priority)}`}>
            {editId === todo._id ? (
              <form onSubmit={handleUpdate} className="edit-form">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({...editData, title: e.target.value})}
                  className="edit-input"
                />
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({...editData, description: e.target.value})}
                  className="edit-textarea"
                />
                <select
                  value={editData.priority}
                  onChange={(e) => setEditData({...editData, priority: e.target.value})}
                  className="edit-select"
                >
                  <option value="low">Low Priority</option>
                  <option value="moderate">Moderate Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <button type="submit" className="update-button">Update</button>
              </form>
            ) : (
              <>
                <div className="todo-content">
                  <h3 className="todo-title">{todo.title}</h3>
                  <p className="todo-description">{todo.description}</p>
                  <div className="todo-meta">
                    <span className={`priority-badge ${getPriorityColor(todo.priority)}`}>
                      {todo.priority}
                    </span>
                    <span className="created-at">
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="todo-buttons">
                  <button onClick={() => handleEdit(todo)} className="edit-button">Edit</button>
                  <button onClick={() => handleDelete(todo._id)} className="delete-button">Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App