import stallRegistration from "../models/StallRegistration.js";

// Post method: to add data 
export const registerStall = async (req, res) => {

  const {
    participantName,
    teammates,
    classDivision,
    contactNumber,
    numberOfBenches,
    category,
    stallDescription,
    facultyApproval,
  } = req.body;

  console.log("Participant Name:", participantName);
  console.log("Teammates:", teammates);
  console.log("Class Division:", classDivision);
  console.log("Contact Number:", contactNumber);
  console.log("Number of Benches:", numberOfBenches);
  console.log("Category:", category);
  console.log("Stall Description:", stallDescription);
  console.log("Faculty Approval:", facultyApproval);

  try {
    const newStallRegistration = await stallRegistration.create({
      participantName,
      teammates,
      classDivision,
      contactNumber,
      numberOfBenches,
      category,
      stallDescription,
      facultyApproval,
    });

    if (newStallRegistration) {
      console.log("stall Registration successful:", newStallRegistration);
      return res.status(201).json({
        message: "Stall registration successful",
        data: newStallRegistration,
      });
    }

  } catch (error) {
    console.error("Error processing stall registration:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  return res
    .status(200)
    .json({ message: "Stall registration successful", data: req.body });
  
};


// Get method: to view data 
export const getAllStalls = async (req, res) => {
  try {
    const stallData = await stallRegistration.find();
    return res.status(200).json({
      message: "Stall registrations retrived successfully",
      data: stallData,
    });
  } catch (error) {
    console.error("Error fetching stall registrations:",error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


// Put method: to update data 
export const updateStall = async (req, res) => {
  const { id } = req.params;
  const { participantName, teammates, classDivision, 
    contactNumber, numberOfBenches, category, stallDescription, 
    facultyApproval } = req.body;
  
    try {
      const updatedStall = await stallRegistration.findByIdAndUpdate(id, {
        participantName,
        teammates,
        classDivision,
        contactNumber,
        numberOfBenches,
        category,
        stallDescription,
        facultyApproval,
      }, { new: true });

      if (!updatedStall) {
        return res.status(404).json({ message : "Stall register not found"});
      }
      return res.status(200).json({
        message: "Stall registration updated successfully",
        data: updatedStall,
      });
    } catch (error) {
      console.error("Error updating stall registration:", error);

      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
};


//Delete method: to delete data
export const deletestall = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStall = await stallRegistration.findByIdAndDelete(id);

    if (!deletedStall) {
      return res.status(404).json({
        message: "Stall not found",
      });
    }

    return res.status(200).json({
      message: "Stall deleted successfully",
      data: deletedStall,
    });
  } catch (error) {
    console.error("Error deleting stall registration:", error);
     return res.status(500).json({
      message: "Internal Server Error",
     });
  }
};