import { OrganizationList, useOrganization } from "@clerk/clerk-react"
import {PricingTable,CreateOrganization} from "@clerk/clerk-react"


function PricingPage(){
    const {organization,membership}=useOrganization()
    const isAdmin= membership?.role==="admin"
    if(!organization){
        return <div className="pricing-container">
            <div className="no-org-container">
                <h1 className="no-org-title">View Pricing</h1>
                <p className="no-org-text">Create an organization to view pricing</p>
                <CreateOrganization afterCreateOrganizationUrl={"/pricing"}/>
            </div>
        </div>
    }
    return <div className="pricing-container">
       <div className="pricing-header">
        <h1 className="pricing-title">Simple, Transparent Pricing</h1>
        <p>Choose the plan that's right for you</p>
       </div>
       {!isAdmin ?(
        <p className={"text-muted pricing-admin-note"}>
            Contact your organiation admin to manage your subscription
        </p>
       ):(
        <PricingTable for={"Organization"}/>
       )}
    </div>
}
export default PricingPage