import {useState, useEffect} from "react"

function TaskForm({task,onSubmit,onCancel}){
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [status,setStatus]=useState("pending")
    const isEditing=!!task

    useEffect(()=>{
        if(task){
            setTitle(task.title)
            setDescription(task.description)
            setStatus(task.status)
        }else{
            setTitle("")
            setDescription("")
            setStatus("pending")
        }
    },[task])

    function handleSubmit(e){
        e.preventDefault()
        if(!title.trim()) return
        onSubmit(
            {title:title.trim(),description:description.trim() || null,status}
        )
    }
    return <div className="modal-overlay" onClick={onCancel}>
        <div className="modal" onClick={(e)=> e.stopPropagation()}>
            <div className="modal-header">
                <h2 className="modal-title">{isEditing? "Edit Task":"New Task"}</h2>
                <button className="modal-close" onClick={onCancel}>x</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor={"title"}>Title</label>
                    <input 
                    type="text" id="title" value={title} onChange={(e)=> setTitle(e.target.value)}
                    placeholder="Enter task title" 
                    autoFocus
                    className="form-input"/>

                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor={"description"}>Description</label>
                    <textarea 
                    id="description" value={description} onChange={(e)=> setDescription(e.target.value)}
                    placeholder="Enter task description" 
                    className="form-textarea"/>

                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor={"status"}>Status</label>
                    <select 
                    id="status" value={status} onChange={(e)=> setStatus(e.target.value)}
                    className="form-select">
                        <option value="pending">Pending</option>
                        <option value="started">Started</option>
                        <option value="completed">Completed</option>
                    </select>

                </div>
                <div className="form-actions">
                    <button type="button" className={"btn btn-outline"} onClick={onCancel}>Cancel</button>
                    <button type="submit" className="btn btn-primary">
                        {isEditing ? "Save Changes":"Create Task"}
                    </button>
                </div>

            </form>
        </div>
    </div>
}

export default TaskForm