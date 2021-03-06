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
        this.setLoadingInital(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach((activity) => {
                activity.date = activity.date.split("T")[0];
                 this.activities.push(activity);
              });
        this.setLoadingInital(false);
        } catch (error) {
            console.log(error)
            this.setLoadingInital(false);
        }
    }

    setLoadingInital = (state: boolean)=> {
        this.loadingInital= state
    }

    selectedActivity = (id: string) => {
        
        this.selectActivity = this.activities.find(x => x.id === id);
    }

    cancelSelectedActivity = () => {
        
        this.selectActivity = undefined;
    }

    openForm = (id?:string) => {
        id ? this.selectedActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
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
                if(this.selectActivity?.id ===id) this.cancelSelectedActivity()
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