import React, {useState, useEffect} from 'react'

function Program({progId, setProgId, reload, setReload}) {
    const [formData, setFormData] = useState({
        price: 0,
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
    const [editable, setEditable] = useState(false)
    const [saveMsg, setSaveMsg] = useState(null)


    useEffect(() => {
        const fetchProgram = async () => {
            try {
                const res = await fetch(`/api/program/get/${progId}`)
                const programData = await res.json()

                const {p_id: id, ...rest} = programData
                setFormData(rest)
            } 
            catch (error) {
                console.log(error)
            }
        }

        fetchProgram()
    }, [progId])


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
            const res = await fetch(`/api/program/update/${progId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()  
            
            if(data.success === false){
                setSaveMsg(data.message)
                setTimeout(() => {
                    setSaveMsg(null)
                },2000)
                setEditable(false)
                return
            }

            setEditable(false)
            setProgId(data.p_id)
            setSaveMsg("Program Saved Succesfully !!!")
            setTimeout(() => {
                setSaveMsg(null)
            },2000)
            setReload(!reload)
        }
        catch(err){
            setSaveMsg(err.message)
            setTimeout(() => {
                setSaveMsg(null)
            },2000)
            setEditable(false)
        }
    }

    const handleDeleteForm = async () => {
        try{
            const res = await fetch(`/api/program/delete/${progId}`, {
                method: 'DELETE',
            })

            const data = await res.json()  
            
            if(data.success === false){
                alert(data.message)
                setProgId(null)
                return
            }
            
            setProgId(null)
            setReload(!reload)
            alert("Program Deleted Sucesfully")
        }
        catch(err){
            alert(err.message)
            setProgId(null)
        }
    }

    return (
        <div>
            
            <form>
                <div className='flex flex-col gap-5 pb-16 pl-5'>
                    {/* Add Program */}
                    <div className='py-5 flex justify-between'>
                        <div>
                            <h1 className='text-3xl font-bold'>Add Program</h1>
                            <div className='flex gap-1'>
                                <p className='text-red-600 text-xl'>*</p>
                                <p>Required to save as Program</p>
                            </div>
                        </div>
                        
                        <div>
                            <button type='button' className='bg-blue-700 text-white rounded-lg py-3 px-6 uppercase hover-opacity:75 disabled:opacity-80' onClick={() => {setEditable(true)}}>Edit</button>
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
                                    readOnly={!editable}
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
                                    readOnly={!editable} 
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
                                    disabled={!editable}    
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
                                    readOnly={!editable}
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
                                        <input type="radio" name="prog_ft" checked={formData.prog_type === 'FT'} onChange={handleChange} disabled={!editable}/>
                                        <label htmlFor="huey">FT</label>
                                    </div>

                                    <div className='flex gap-2'>
                                        <input type="radio" name="prog_pt" checked={formData.prog_type === 'PT'} onChange={handleChange} disabled={!editable}/>
                                        <label htmlFor="dewey">PT</label>
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
                                        <input type="radio" name="reg_yes" checked={formData.reg_type === 'yes'} onChange={handleChange} disabled={!editable}/>
                                        <label htmlFor="huey">Yes</label>
                                    </div>

                                    <div className='flex gap-2'>
                                        <input type="radio" name="reg_no" checked={formData.reg_type === 'no'} onChange={handleChange} disabled={!editable}/>
                                        <label htmlFor="dewey">No</label>
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
                                    readOnly={!editable}
                                    >
                                    </input>
                            </div>

                            <div>
                                <div className='flex gap-1'>
                                    <p className='text-red-600 text-xl'>*</p>
                                    <p className='font-semibold'>Certificate or Diploma</p>
                                </div>
                                <div className='border p-2 rounded-lg'>
                                    <select className='pr-24' name="deg_type" value={formData.deg_type} onChange={handleChange} disabled={!editable}>
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
                                    readOnly={!editable}
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
                                    readOnly={!editable}
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
                                    readOnly={!editable}
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
                                    readOnly={!editable}
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
                                    readOnly={!editable}
                                    >
                                </input>
                            </div>
                        </div>

                        <div className='flex justify-around'>
                            <div>
                                {saveMsg && <p className='text-blue-600'>{saveMsg}</p>}
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className='flex justify-between'>
                    <button disabled={editable ? false : true} className='bg-red-700 text-white rounded-lg py-3 px-6 uppercase hover-opacity:75 disabled:opacity-80' type='button' onClick={handleDeleteForm}>Delete</button>
                    <button disabled={editable ? false : true} className='bg-blue-700 text-white rounded-lg py-3 px-6 uppercase hover-opacity:75 disabled:opacity-80' type='button' onClick={handleSaveForm}>Save</button>
                </div>

            </form>
        </div>
    )
}

export default Program
