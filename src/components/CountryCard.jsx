import { motion } from "framer-motion"
import { useState } from "react"


const CountryCard = ({ c }) =>
{
    const [rotate, setRotate] = useState(false)


    
    return(
        <motion.div 
            animate = {{ rotate: rotate ? 360 : 0}}
            initial = "hidden"
            viewport = {{ once:true }}
            whileInView="visible"
            transition={{ duration: 0.4, type: "spring", bounce: 0.5 }}

            onClick = { () => {setRotate(!rotate) } }

            variants = 
            {
                {
                    visible: { opacity: 1, scale: 1},
                    hidden: { opacity: 0, scale: 0}
                }
            }
            >
            <div className="container border rounded my-3 py-1 country-card-bg" style={{color:'lightblue'}}>
                
                <div className="row">
                    <div className="col-8">
                        <h2>{c.name}</h2>
                    </div>
                    {/* <div className="col">
                        {c.flag}
                    </div> */}
                </div>
                <center>
                <div className="row my-3" style={{color:'red'}}>
                    <div className="col">
                        {c.lan}
                    </div>
                    <div className="col">
                        {c.continent}
                    </div>
                </div>

                </center>
            </div>
        </motion.div>
    )
}

export default CountryCard;