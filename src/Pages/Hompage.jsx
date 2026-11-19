
import AddMovie from "../Components/Addmovieform";

import { Showmovies } from "../Components/ShowMovie";


export default function Homepage () {
    
    return (
       <section>
      
       <Showmovies></Showmovies>
      <div className="fixed bottom-5 right-5 z-50">
        <AddMovie />
        </div>
      
       </section>
    )
}