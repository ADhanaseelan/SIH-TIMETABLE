
import AddTable from "../Components/Shared/addtable";
// import { q } from "framer-motion/client";

const AddStaff: React.FC = () => {


  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-center">
        <h2 className="text-xl font-bold mb-4">Computer Science Engineering</h2>
      </div>

     
      <p className="font-bold">New List</p>
        <AddTable columns={[ "Staff Id", "Staff Name","Qualification", "Phone Number"]} />

      
    </div>
  );
};

export default AddStaff;
