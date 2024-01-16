import React, { useState, useEffect } from 'react'
import Program from '../components/Program'
import Header from '../components/Header'
import NewProgram from '../components/NewProgram'
import ProgramCard from '../components/ProgramCard'

function Home() {
  const [progId, setProgId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [domain, setDomain] = useState("")
  const [error, setError] = useState(null)
  const [programs, setPrograms] = useState([])
  const [domains, setDomains] = useState(null)
  const [reload, setReload] = useState(false)
  const [viewDashboard, setViewDashboard] = useState(true)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch(`/api/program/get?searchTerm=${searchTerm}&domain=${domain}`)
        const programsData = await res.json()

        if(programsData.length > 0){
          setPrograms(programsData)
        }
        else{
          setPrograms([])
        }
      } 
      catch (error) {
        setError(error.message)
      }
    }

    fetchPrograms()
  }, [searchTerm, reload, domain])

  useEffect(() => {
    if(programs.length > 0){
      setProgId(programs[0].p_id)

      const domainsArray = programs.map((program) => {
        return program.domain
      })

      const uniqueArray = domainsArray.filter((domain, index, self) => {
        return self.indexOf(domain) === index;
      })
      setDomains(uniqueArray)
    }
  }, [programs])


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleOnCardClick = (id) => {
    setProgId(id)
  }

  const handleAddClick = () => {
    setProgId(null)
  }

  return (
    <div>
      <Header viewDashboard={viewDashboard} setViewDashboard={setViewDashboard}/>

      <div className='flex gap-5'>

        {/* Dashboard */}
        {viewDashboard && <div className='border px-5'>

          <div className='flex items-center'>
            <div className='pr-24 py-3'>
              <h1 className='text-3xl font-bold'>Programs</h1>
              {programs && <p className='font-semibold'>{programs.length} Total</p>}
            </div>

            <div className='pl-24' onClick={handleAddClick}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" strokeWidth={1} stroke="white" className="w-14 h-14">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          </div>

          <div className='pb-5'>
            <input 
              type="text" 
              name="search" 
              placeholder='Search'
              className='border p-2 rounded-lg w-full'
              value={searchTerm}
              onChange={handleSearchChange}
              >
            </input>

            {error && <p className='text-red-600'>{error}</p>}
          </div>

          <div className='flex'>
            <div onClick={() => {setDomain("")}} className={(domain === "") ? 'border-black border-2 px-3 rounded-lg bg-blue-300' : 'border-black border-2 px-3 rounded-lg hover:bg-blue-300'}>
              <p>All</p>
            </div>

            {domains && 
              domains.map((m_domain, index) => {
                return(
                <div key={index} onClick={() => {setDomain(m_domain)}} className={(domain === m_domain) ? 'border-black border-2 px-3 rounded-lg bg-blue-300' : 'border-black border-2 px-3 rounded-lg hover:bg-blue-300'}>
                  <p>{m_domain}</p>
                </div>
                )
              })
            }
          </div>

          <div className='pt-5'>
            {programs.length > 0 && 
              programs.map((program, index) => {
                return(
                <div key={index} className={program.p_id === progId ? 'bg-slate-500 border rounded-lg' : 'border rounded-lg'} onClick={() => {handleOnCardClick(program.p_id)}}>
                  <ProgramCard progName={program.name} lastModified={program.last_modified} imgUrl={program.imgUrl}/>
                </div>
                )
              })
            }
          </div>

        </div>}


        {!progId && <NewProgram setProgId={setProgId} reload={reload} setReload={setReload}/>}
        {progId && <Program progId={progId} setProgId={setProgId} reload={reload} setReload={setReload}/>}

      </div>
    </div>
    
  )
}

export default Home
