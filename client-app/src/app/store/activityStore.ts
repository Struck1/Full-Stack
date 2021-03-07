import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

export default class ActivityStore{

    activities: Activity[] = [];
    loadingInital:boolean =false;
    selectActivity: Activity | undefined = undefined;
    editMode: Boolean = false;
    loading:Boolean= false;
    
    

    constructor(){
        makeAutoObservable(this)
    }
    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list();
            activities.forEach((activity) => {
              this.setActivity(activity);
              });    
        } catch (error) {
            console.log(error)     
        }
    }

    loadActivity = async (id:string) => {
        let activity = this.getActivity(id);
        if(activity){
            this.selectActivity = activity;
            return activity
        }else{
            this.loadingInital = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(()=> {
                    this.selectActivity = activity
                })
               
                return activity;
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    private getActivity = (id: string) => {
        return this.activities.find(a => a.id === id);
    }

    private setActivity = (activity:Activity) => {
        activity.date = activity.date.split("T")[0];
        this.activities.push(activity);
    }

    setLoadingInital = (state: boolean)=> {
        this.loadingInital= state
    }


    createActivity = async (activity: Activity) => {
        this.loading=true;
   
        activity.id = uuid();
        try {          
            await agent.Activities.create(activity);
            runInAction(() =>{
                this.activities.push(activity);
                this.selectActivity = activity;
                this.loading=false
                this.editMode = false
            })

        } catch (error) {
            console.error(error);
            this.loading=false;
        }
        
    }

    updateActivity = async  (activity: Activity) => {
        this.loading=true;
        try {
            
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
                this.editMode = false;
                this.selectActivity = activity;
                this.loading=false;
            })

        } catch (error) {
            console.error(error);
            this.loading=false;
        }
    }

    deleteActivity = async (id :string)=> {
        this.loading = true;
        try {
            await agent.Activities.delete(id)
            runInAction(() => {
                this.activities = [...this.activities.filter(a => a.id !== id)]
                this.loading=false;
            })
        } catch (error) {
            console.error(error);
            runInAction(()=> {
                this.loading = false;
            })
        } 
    }

}