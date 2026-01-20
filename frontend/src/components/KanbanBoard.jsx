import {useState} from "react"
import {useOrganization} from "@clerk/clerk-react"
import TaskColumn from "./TaskColumn"
import {createTask,updateTask,deleteTask} from "../services/api"
import TaskForm from "./TaskForm"

const STATUS_OPTIONS = ["pending","started","completed"]

function KanbanBoard({tasks,setTasks,getToken}){
    const {membership} =useOrganization()
    const [showForm, setShowForm]=useState(false)
    const [editingTask, setEditingTask]=useState(null)

    const role = membership?.role
    const canManage=role ==="org:admin"|| role==="org:editor"

    function getTasksByStatus(status){
        return tasks.filter(task =>task.status===status)
    }
    function handleEdit(task){
        setEditingTask(task)
        setShowForm(true)
    }
    async function handleDelete(taskId){
        if(!confirm("Are you sure you want to delete")){
            return
        }
        const taskToDelete=tasks.find(t=> t.id===taskId)
        setTasks(prev=>prev.filter(t=>t.id!==taskId))
        try{
            await deleteTask(getToken, taskId)
        }
        catch(error){
            console.error("Error deleting task:",error)
            setTasks(prev=>[...prev,taskToDelete])
        }
    }

    async function handleSubmit(taskData){
        if(editingTask){
            const updatedtask={...editingTask,...taskData}
            setTasks(prev=>prev.map(t=>t.id===updatedtask.id?updatedtask:t))
            setShowForm(false)
            setEditingTask(null)
            try {
                await updateTask(getToken,editingTask.id,taskData)
            } catch (error) {
                setTasks(prev=>prev.map(t=>t.id===editingTask.id?editingTask:t))  
                console.error("Error updating task:",error)              
            }
        }else{
            try {
                const newTask=await createTask(getToken,taskData)
                setTasks(prev=>[...prev,newTask])
                setShowForm(false)
                
            } catch (error) {
                console.error("Error creating task:",error)
            }
        }
    }

    function handleCancel(){
        setShowForm(false)
        setEditingTask(null)
    }

    function handleAddTask(){
        setShowForm(true)
        setEditingTask(null)
    }

    return(
        <div className="kanban-wrapper">
            <div className="kanban-header">
                <h2 className="kanban-title">Tasks</h2>
                {canManage && (
                    <button className={"btn btn-primary"} onClick={handleAddTask}> + Add Task</button>
                )}
            </div>
            
            <div className="kanban-board">
                {STATUS_OPTIONS.map(status=>(
                    <TaskColumn 
                    key={status}
                    status={status}
                    tasks={getTasksByStatus(status)}
                    onEdit={canManage?handleEdit:null}
                    onDelete={canManage?handleDelete:null}
                    />
                ))}
            </div>

            {showForm && <TaskForm task={editingTask} onSubmit={handleSubmit} onCancel={handleCancel} />}
        </div>
    )
} 

export default KanbanBoard 