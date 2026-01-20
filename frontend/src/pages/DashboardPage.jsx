import KanbanBoard from "../components/KanbanBoard";
import {useState , useEffect,useCallback} from "react"
import { useAuth, useOrganization,CreateOrganization } from "@clerk/clerk-react";
import {getTasks} from "../services/api"
function DashboardPage(){
    const {getToken}=useAuth()
    const {organization, membership}=useOrganization(
        {membership:{Infinite:true}}
    )

    const [tasks,setTasks]=useState([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)

    const memberCount=membership?.count??0
    const orgId=organization?.id
    const loadTasks=useCallback(async()=>{
        try{
            const tasks=await getTasks(getToken)
            setError(null)
            setLoading(true)
            setTasks(tasks)
        }
        catch(error){
            setError(error.message)
        }finally{
            setLoading(false)
        }
    },[getToken])

    useEffect(()=>{
        if(orgId){
            loadTasks()
        }else{
            setLoading(false)
        }
    },[orgId,loadTasks])

    if(!organization){
        return <div className="dashboard-container">
            <div className="no-org-container">
                <h1 className="no-org-title"> Welcome to TaskBoard</h1>
                <p className="no-org-text">Create an organization to get started</p>
                <CreateOrganization afterCreateOrganizationUrl={"/dashboard"}/>
            </div>
        </div>
    }
    
    return <div className="dashboard-container">
        <div className="dashboard-header">
            <div>
                <h1 className="dashboard-title">{organization.name}</h1>
                <p className="org-members">{memberCount} member{memberCount===1?"":"s"}</p>
            </div>
        </div>
        {loading ? (
            <p className="text-muted">Loading tasks...</p>
        ):error ? (
            <div className="card-error">
                <p className={"text-error text-error-title"}>Error loading tasks</p>
                <p className="text-error text-error-message">{error}</p>
            </div>
        ):(
            <KanbanBoard tasks={tasks} setTasks={setTasks} getToken={getToken}/>
        )}
    </div>
}
export default DashboardPage