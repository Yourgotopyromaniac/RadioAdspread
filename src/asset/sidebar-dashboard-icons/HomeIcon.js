import {React} from "react"

const HomeIcon = ({color}) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1639_1635)">
<path d="M12 15C13.1046 15 14 14.1046 14 13C14 11.8954 13.1046 11 12 11C10.8954 11 10 11.8954 10 13C10 14.1046 10.8954 15 12 15Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.45 11.55L15.5 9.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.4 20.0006C4.93815 18.8387 3.87391 17.2509 3.35478 15.4571C2.83564 13.6633 2.88732 11.7525 3.50265 9.98945C4.11797 8.22637 5.26647 6.69835 6.78899 5.61714C8.3115 4.53593 10.1326 3.95508 12 3.95508C13.8674 3.95508 15.6885 4.53593 17.211 5.61714C18.7335 6.69835 19.882 8.22637 20.4974 9.98945C21.1127 11.7525 21.1644 13.6633 20.6452 15.4571C20.1261 17.2509 19.0619 18.8387 17.6 20.0006H6.4Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1639_1635">
<rect width="24" height="24" fill={color}/>
</clipPath>
</defs>
</svg>

  )
}

export default HomeIcon;