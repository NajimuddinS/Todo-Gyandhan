import { useState, useEffect } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import './App.css'

function SortableItem({ todo, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: todo._id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-move"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{todo.title}</h3>
          <p className="text-gray-600">{todo.description}</p>
          <span className={`inline-block px-2 py-1 rounded text-sm ${
            todo.priority === 'High' ? 'bg-red-100 text-red-800' :
            todo.priority === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {todo.priority}
          </span>
        </div>
        <button
          onClick={() => onDelete(todo._id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Moderate')
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState('none')
  const [sortDirection, setSortDirection] = useState('asc')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const API_URL = 'https://todo-gyandhyan.onrender.com/api/todos'

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL)
      setTodos(response.data)
    } catch (error) {
      toast.error('Failed to fetch todos')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description) {
      toast.error('Please fill all required fields')
      return
    }

    setLoading(true)
    try {
      await axios.post(API_URL, {
        title,
        description,
        priority
      })
      toast.success('Todo added successfully')
      setTitle('')
      setDescription('')
      setPriority('Moderate')
      fetchTodos()
    } catch (error) {
      toast.error('Failed to add todo')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      toast.success('Todo deleted successfully')
      fetchTodos()
    } catch (error) {
      toast.error('Failed to delete todo')
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id)
        const newIndex = items.findIndex((item) => item._id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleSort = (type) => {
    if (type === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortDirection('asc')
    }
    setSortBy(type)
    
    if (type === 'none') {
      fetchTodos()
      return
    }

    const sortedTodos = [...todos]
    
    switch (type) {
      case 'priority':
        const priorityOrder = { 'High': 1, 'Moderate': 2, 'Low': 3 }
        sortedTodos.sort((a, b) => {
          const comparison = priorityOrder[a.priority] - priorityOrder[b.priority]
          return sortDirection === 'asc' ? comparison : -comparison
        })
        break
      case 'title':
        sortedTodos.sort((a, b) => {
          const comparison = a.title.localeCompare(b.title)
          return sortDirection === 'asc' ? comparison : -comparison
        })
        break
      case 'description':
        sortedTodos.sort((a, b) => {
          const comparison = a.description.localeCompare(b.description)
          return sortDirection === 'asc' ? comparison : -comparison
        })
        break
    }
    
    setTodos(sortedTodos)
  }

  return (
    <div className="min-h-screen bg-violet-200 py-8 px-4 rounded-lg">
      <Toaster position="top-right" />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Todo App</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter title"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter description"
              rows="3"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Todo'}
          </button>
        </form>

        <div className="mb-4 flex justify-end items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="none">Sort by...</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
            <option value="description">Description</option>
          </select>
          {sortBy !== 'none' && (
            <button
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              className="p-2 border rounded hover:bg-gray-100"
              title="Toggle sort direction"
            >
              {sortDirection === 'asc' ? '↑' : '↓'}
            </button>
          )}
        </div>

        <div className="space-y-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={todos.map(todo => todo._id)}
              strategy={verticalListSortingStrategy}
            >
              {todos.map((todo) => (
                <SortableItem
                  key={todo._id}
                  todo={todo}
                  onDelete={handleDelete}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  )
}

export default App