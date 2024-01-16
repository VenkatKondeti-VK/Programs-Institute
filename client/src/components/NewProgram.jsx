import React, {useState} from 'react'

function NewProgram({setProgId, reload, setReload}) {
    const [formData, setFormData] = useState({
        price: undefined,
        domain: "",
        assurance: false,
        name: "",
        prog_type: 'FT',
        reg_type: 'yes',
        uni_name: "",
        deg_type: "certificate",
        faculty_profile: "",
        duration: "",
        criteria: "",
        img_url: "",
        description: "",
    })


    const handleChange = (e) => {
        if(e.target.name === 'assurance'){
            setFormData({...formData, [e.target.name]: e.target.checked})
        }
        else if(e.target.name === 'FT' || e.target.name === 'PT'){
            setFormData({...formData, prog_type: e.target.name})
        }
        else if(e.target.name === 'yes' || e.target.name === 'no'){
            setFormData({...formData, reg_type: e.target.name})
        }
        else{
            setFormData({...formData, [e.target.name]: e.target.value})
        }
    }


    const handleSaveForm = async() => {
        try{
            const res = await fetch('/api/program/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()  
            
            if(data.success === false){
                alert(data.message)
                return
            }
            setProgId(data.p_id)
            setReload(!reload)
            alert("Program Created Succesfully !!!")
        }
        catch(err){
            alert(err.message)
        }
    }


    
    return (
        <div className=''>
            <form>
                <div className='flex flex-col gap-5 pb-16 pl-5'>
                    {/* Add Program */}
                    <div className='py-5'>
                        <h1 className='text-3xl font-bold'>Add Program</h1>
                        <div className='flex gap-1'>
                            <p className='text-red-600 text-xl'>*</p>
                            <p>Required to save as Program</p>
                        </div>
                    </div>

                    {/* Confirm Program */}
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-2xl font-bold'>Confirm Program</h1>
                        <div className='flex gap-5'>
                            <div>
                                <div className='flex gap-1'>
                                    <p className='text-red-600 text-xl'>*</p>
                                    <p className='font-semibold'>Price</p>
                                </div>
                                <input 
                                    type="number" 
                                    name="price" 
                                    placeholder='INR'
                                    onChange={handleChange}
                                    className='border p-2 rounded-lg'
                                    value={formData.price}  
                                    required 
                                    >
                                </input>
                            </div>

                            <div>
                                <div className='flex gap-1'>
                                    <p className='text-red-600 text-xl'>*</p>
                                    <p className='font-semibold'>Domain</p>
                                </div>
                                <input 
                                    type="text" 
                                    name="domain" 
                                    placeholder='Domain' 
                                    onChange={handleChange}
                                    className='border p-2 rounded-lg' 
                                    value={formData.domain}   
                                    required 
                                    >
                                </input>
                            </div>

                            <div className='flex'>
                                <input 
                                    type="checkbox" 
                                    name="assurance" 
                                    placeholder='Domain' 
                                    onChange={handleChange}
                                    className='border p-2 rounded-lg'
                                    checked={formData.assurance}     
                                    >
                                </input>
                                <p className='font-semibold py-5 px-1'>Placement Assurance</p>
                            </div>
                        </div>
                    </div>

                    {/* Information */}
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-2xl font-bold'>Information</h1>
                        <div className='flex gap-5'>
                            <div>
                                <div className='flex gap-1'>
                                    <p className='text-red-600 text-xl'>*</p>
                                    <p className='font-semibold'>Name</p>
                                </div>
                                <input 
                                    type="text" 
                                    name="name" 
                                    placeholder='Name' 
                                    onChange={handleChange}
                                    className='border p-2 rounded-lg'  
                                    value={formData.name} 
                                    required 
                                    >
                                </input>
                            </div>

                            <div>
                                <div className='flex gap-1'>
                                    <p className='text-red-600 text-xl'>*</p>
                                    <p className='font-semibold'>Program Type</p>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='flex gap-2'>
                                        <input type="radio" name="FT" checked={formData.prog_type === 'FT'} onChange={handleChange} />
                                        <label htmlFor="FT">FT</label>
                                    </div>

                                    <div className='flex gap-2'>
                                        <input type="radio" name="PT" checked={formData.prog_type === 'PT'} onChange={handleChange}/>
                                        <label htmlFor="PT">PT</label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='flex gap-1'>
                                    <p className='text-red-600 text-xl'>*</p>
                                    <p className='font-semibold'>Registration Open</p>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='flex gap-2'>
                                        <input type="radio" name="yes" checked={formData.reg_type === 'yes'} onChange={handleChange} />
                                        <label htmlFor="yes">Yes</label>
                                    </div>

                                    <div className='flex gap-2'>
                                        <input type="radio" name="no" checked={formData.reg_type === 'no'} onChange={handleChange} />
                                        <label htmlFor="no">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-5'>
                            <div>
                                <div className='flex gap-1'>
                                    <p className='text-red-600 text-xl'>*</p>
                                    <p className='font-semibold'>University Name / Partner</p>
                                </div>  
                                <input 
                                    type="text" 
                                    name="uni_name" 
                                    placeholder='University Name' 
                                    onChange={handleChange}
                                    className='border p-2 rounded-lg' 
                                    value={formData.uni_name}  
                                    required 
                                    >
                                    </input>
                            </div>

                            <div>
                                <div className='flex gap-1'>
                                    <p className='text-red-600 text-xl'>*</p>
                                    <p className='font-semibold'>Certificate or Diploma</p>
                                </div>
                                <div className='border p-2 rounded-lg'>
                                    <select className='pr-24' name="deg_type" value={formData.deg_type} onChange={handleChange}>
                                        <option value="certificate">Certificate</option>
                                        <option value="diploma">Diploma</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <div className='flex gap-1'>
                                    <p className='text-red-600 text-xl'>*</p>
                                    <p className='font-semibold'>Faculty Profile</p>
                                </div>
                                <input 
                                    type="text" 
                                    name="faculty_profile" 
                                    placeholder='Faculty Profile'
                                    onChange={handleChange} 
                                    className='border p-2 rounded-lg'  
                                    value={formData.faculty_profile} 
                                    required 
                                    >
                                </input>
                            </div>
                        </div>

                        <div className='flex gap-5'>
                            <div>
                                <div className='flex gap-1'>
                                    <p className='text-red-600 text-xl'>*</p>
                                    <p className='font-semibold'>Learning Hours / Duration</p>
                                </div>
                                <input 
                                    type="text" 
                                    name="duration" 
                                    placeholder='Learning Hours' 
                                    onChange={handleChange}
                                    className='border p-2 rounded-lg' 
                                    value={formData.duration}  
                                    required 
                                    >
                                    </input>
                            </div>

                            <div>   
                                <p className='font-semibold'>Eligibility Criteria</p>
                                <input 
                                    type="text" 
                                    name="criteria" 
                                    placeholder='Eligibility Criteria' 
                                    onChange={handleChange}
                                    className='border p-2 rounded-lg'  
                                    value={formData.criteria} 
                                    >
                                </input>
                            </div>

                            <div>
                                <div className='flex gap-1'>
                                    <p className='text-red-600 text-xl'>*</p>
                                    <p className='font-semibold'>Image URL</p>
                                </div>
                                <input 
                                    type="text" 
                                    name="img_url" 
                                    placeholder='Image URL' 
                                    onChange={handleChange}
                                    className='border p-2 rounded-lg' 
                                    value={formData.img_url} 
                                    required 
                                    >
                                </input>
                            </div>
                        </div>

                        <div>
                            <div>
                                <div className='flex gap-1'>
                                    <p className='text-red-600 text-xl'>*</p>
                                    <p className='font-semibold'>Description</p>
                                </div>
                                <input 
                                    type="text" 
                                    name="description" 
                                    placeholder='Description' 
                                    onChange={handleChange}
                                    className='border p-2 rounded-lg w-full' 
                                    value={formData.description} 
                                    required 
                                    >
                                </input>
                            </div>
                        </div>
                        
                    </div>

                </div>

                <div className='flex justify-end '>
                    <button className='bg-blue-700 text-white rounded-lg py-3 px-6 uppercase hover-opacity:75 disabled:opacity-80' type='button' onClick={handleSaveForm}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default NewProgram
