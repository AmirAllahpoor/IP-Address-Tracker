import imgarrow from "../assets/icon-arrow.svg"
import { MapContainer, TileLayer  } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { useState , useEffect } from "react"
import axios from "axios"
import MarkerPosition from "./markerposition"

const PrimaryPage = () => {

    const REACT_APP_API_KEY = "at_mWunueL5G3phAlGjTNhd6W1Xmeu1K"
    const [address , setAddress] = useState(null)
    const [ipAddress , setIpAddress] = useState('')

    useEffect(() => {
        try{
            const getdata = async () => {
                const res = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${REACT_APP_API_KEY}&ipAddress=1.0.0.1`)
                setAddress(res.data)
            }
            getdata()
        }
        catch(err){
            console.error(err)
        }
    },[])

   async function getEnteredAddress (){
        const res = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${REACT_APP_API_KEY}${`&ipAddress=${ipAddress}`}`)
            setAddress(res.data)
    }
    
    function handleSubmit ( e) {
        e.preventDefault()
        getEnteredAddress()
    }

    return ( 
        <div className="maindiv">
            <div className="headertracker bg-[#6922da] w-full h-64 bg-cover bg-no-repeat bg-center">
            <div className="textheader flex flex-row justify-center ">
                <h1 className="font-sans text-3xl text-white font-medium mt-5 sm:text-2xl">IP Address Tracker</h1>     
            </div>
            <div className="input flex flex-row justify-center mt-8">
                <form   className="flex flex-row justify-center w-full" onSubmit={handleSubmit}>
                <input type="text" placeholder="Search for any IP address or domain" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)}
                 className="md:w-3/4 xl:w-1/3 h-12 p-5 font-sans text-slate-900 font-normal outline-none rounded-l-xl sm:w-3/4 sm:text-sm"/>
                <button className="bg-zinc-900 w-16 rounded-r-xl sm:w-12 cursor-pointer hover:bg-zinc-800" ><img src={imgarrow} alt="" className=" w-1/4 ml-5 sm:ml-4 sm:w-2/8" /></button>
                </form>
            </div>
            {
                address && (
                    <div className="centerboxinfo z-50 flex  flex-row justify-center">
                <div className="boxinfo shadow z-40 shadow-slate-300 bg-white w-3/4 mt-12 sm:w-5/6 sm:h-80 md:w-5/6 h-36 md:h-40 rounded-2xl flex sm:flex-col flex-row justify-center">
                    <div className="boxininfo w-full sm:h-full sm:pb-4 sm:pr-7 sm:pt-0 pl-8 pr-5 pt-9 flex sm:flex-col flex-row justify-around">
                    <div className="boxtext1  sm:text-center">
                        <div className="category1">
                            <p className="font-sans font-bold text-xs uppercase text-gray-500">ip address</p>
                        </div>
                        <div className="description1">
                            <p className="font-sans font-bold text-xl mt-3 text-zinc-800">{address.ip}</p>
                        </div>
                    </div>
                    <hr className="rotate-90 mt-8 w-20  bg-zinc-300 sm:hidden" />
                    <div className="boxtext2 sm:text-center">
                        <div className="category2">
                            <p className="font-sans font-bold text-xs uppercase text-gray-500">location</p>
                        </div>
                        <div className="description2">
                            <p className="font-sans font-bold text-xl mt-3 text-zinc-800">{address.location.city} , {address.location.region}</p>
                        </div>
                    </div>
                    <hr className="rotate-90 mt-8 w-20  bg-zinc-300 sm:hidden" />
                    <div className="boxtext3 sm:text-center">
                        <div className="category3">
                            <p className="font-sans font-bold text-xs uppercase text-gray-500">timezone</p>
                        </div>
                        <div className="description3">
                            <p className="font-sans font-bold text-xl mt-3 text-zinc-800">UTC {address.location.timezone}</p>
                        </div>
                    </div>
                    <hr className="rotate-90 mt-8 w-20  bg-zinc-300 sm:hidden" />
                    <div className="boxtext4 sm:mr-0 mr-10 sm:text-center">
                        <div className="category4">
                            <p className="font-sans font-bold text-xs uppercase text-gray-500">isp</p>
                        </div>
                        <div className="description4">
                            <p className="font-sans font-bold text-xl mt-3 text-zinc-800">{address.isp}</p>
                        </div>
                    </div>
                    </div>
                </div>  
            </div>
                )
            }
            </div>
            {
                address && (
            <MapContainer center={[address.location.lat , address.location.lng]} zoom={13} scrollWheelZoom={true} className="h-screen z-20 mt-0 w-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
             <MarkerPosition address={address} />
            </MapContainer>
                )
            }
            

        </div>
     );
}
 
export default PrimaryPage;