import styled from "styled-components";
export const Container = styled.div`
  width: 158px;
  height: 30px;
  &:hover {
    background: rgba(228, 240, 237, 0.6);
    color: #f99b28;
  }
  color: #c52d2f;
  border-radius: 0px;
  padding: 7.5px 15px;
  cursor: pointer;
`;
export const PopoverText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;

export const ProfileIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3335 17.5V15.8333C13.3335 14.9493 12.9823 14.1014 12.3572 13.4763C11.7321 12.8512 10.8842 12.5 10.0002 12.5H4.16683C3.28277 12.5 2.43493 12.8512 1.80981 13.4763C1.18469 14.1014 0.833496 14.9493 0.833496 15.8333V17.5"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.08333 9.16667C8.92428 9.16667 10.4167 7.67428 10.4167 5.83333C10.4167 3.99238 8.92428 2.5 7.08333 2.5C5.24238 2.5 3.75 3.99238 3.75 5.83333C3.75 7.67428 5.24238 9.16667 7.08333 9.16667Z"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.166 9.16667L15.8327 10.8333L19.166 7.5"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const LogOutIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
        stroke="currentColor"
        stroke-width="0.733333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.3335 14.1663L17.5002 9.99967L13.3335 5.83301"
        stroke="currentColor"
        stroke-width="0.733333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.5 10H7.5"
        stroke="currentColor"
        stroke-width="0.733333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const DashboardHomeIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_6421_7944)">
        <path
          d="M12 15C13.1046 15 14 14.1046 14 13C14 11.8954 13.1046 11 12 11C10.8954 11 10 11.8954 10 13C10 14.1046 10.8954 15 12 15Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.45 11.55L15.5 9.5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.4 19.9987C4.93815 18.8368 3.87391 17.2489 3.35478 15.4552C2.83564 13.6614 2.88732 11.7506 3.50265 9.9875C4.11797 8.22442 5.26647 6.6964 6.78899 5.61519C8.3115 4.53398 10.1326 3.95313 12 3.95312C13.8674 3.95313 15.6885 4.53398 17.211 5.61519C18.7335 6.6964 19.882 8.22442 20.4974 9.9875C21.1127 11.7506 21.1644 13.6614 20.6452 15.4552C20.1261 17.2489 19.0619 18.8368 17.6 19.9987H6.4Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_6421_7944">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export const CampaignsIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_6421_7951)">
        <path
          d="M11.933 5H5V21H18V13"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14 17H9"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9 13H14V9H9V13Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 5V3"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18 6L20 4"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19 9H21"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_6421_7951">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const DraftsIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_6421_7961)">
        <path
          d="M11.795 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H17C17.5304 5 18.0391 5.21071 18.4142 5.58579C18.7893 5.96086 19 6.46957 19 7V11"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 3V7"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7 3V7"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3 11H19"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18 16.4961V18.0001L19 19.0001"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_6421_7961">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const WalletIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_6421_7971)">
        <path
          d="M18 5H6C4.34315 5 3 6.34315 3 8V16C3 17.6569 4.34315 19 6 19H18C19.6569 19 21 17.6569 21 16V8C21 6.34315 19.6569 5 18 5Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3 10H21"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7 15H7.01"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11 15H13"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_6421_7971">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const AnalyticsIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 16V11M12 16V8M16 16V14M18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4V4Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const UserIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17 11L19 13L23 9"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};


export const RolesIcon = () => {
  return (
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.875 18.375V16.625C14.875 15.6967 14.5063 14.8065 13.8499 14.1501C13.1935 13.4937 12.3033 13.125 11.375 13.125H4.375C3.44674 13.125 2.5565 13.4937 1.90013 14.1501C1.24375 14.8065 0.875 15.6967 0.875 16.625V18.375" stroke="white" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.875 9.625C9.808 9.625 11.375 8.058 11.375 6.125C11.375 4.192 9.808 2.625 7.875 2.625C5.942 2.625 4.375 4.192 4.375 6.125C4.375 8.058 5.942 9.625 7.875 9.625Z" stroke="white" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20.125 18.3765V16.6265C20.1244 15.851 19.8663 15.0977 19.3912 14.4848C18.9161 13.8719 18.2509 13.4341 17.5 13.2402" stroke="white" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14 2.74023C14.7529 2.933 15.4202 3.37085 15.8967 3.98476C16.3732 4.59866 16.6319 5.35371 16.6319 6.13086C16.6319 6.90801 16.3732 7.66305 15.8967 8.27696C15.4202 8.89087 14.7529 9.32872 14 9.52148" stroke="white" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        );

};

export const AdvertiserIcon = () => {
  return (
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.08406 9.4991C4.08406 9.4991 3.63281 9.32988 3.63281 8.5966C3.63281 7.86332 4.08406 7.6941 4.08406 7.6941M14.9141 9.21707C14.9141 9.21707 15.3653 9.09495 15.3653 8.5966C15.3653 8.09825 14.9141 7.97613 14.9141 7.97613M9.49906 6.7916V10.4016M5.43781 6.7916V10.4016M13.7842 3.75187C13.7842 3.75187 11.3407 6.7916 9.04781 6.7916H4.53531C4.41563 6.7916 4.30086 6.83914 4.21623 6.92377C4.1316 7.00839 4.08406 7.12317 4.08406 7.24285V9.95035C4.08406 10.07 4.1316 10.1848 4.21623 10.2694C4.30086 10.3541 4.41563 10.4016 4.53531 10.4016H9.04781C11.3407 10.4016 13.7842 13.454 13.7842 13.454C13.9552 13.6796 14.4628 13.5251 14.4628 13.1768V4.0277C14.4628 3.68051 13.9834 3.49691 13.7842 3.75187Z" stroke="white" stroke-width="1.14" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.3418 10.4023V15.1405C6.3418 15.2003 6.36557 15.2577 6.40788 15.3C6.45019 15.3423 6.50758 15.3661 6.56742 15.3661H8.06219C8.13288 15.3661 8.20258 15.3495 8.26568 15.3177C8.32879 15.2858 8.38353 15.2396 8.42549 15.1827C8.46745 15.1258 8.49545 15.0599 8.50725 14.9902C8.51905 14.9205 8.51431 14.849 8.49341 14.7814C8.25707 14.0233 7.69555 13.1685 7.69555 11.7561H8.1468C8.26648 11.7561 8.38125 11.7086 8.46588 11.6239C8.5505 11.5393 8.59805 11.4245 8.59805 11.3048V10.8536C8.59805 10.7339 8.5505 10.6191 8.46588 10.5345C8.38125 10.4499 8.26648 10.4023 8.1468 10.4023H7.69555" stroke="white" stroke-width="1.14" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="0.57" y="0.57" width="17.86" height="17.86" rx="0.696667" stroke="white" stroke-width="1.14"/>
          </svg>
        );
};

export const TransactionsIcon = () => {
  return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 6V18" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9V15C22 20 20 22 15 22Z" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        );
};


export const BlogIcon = () => {
  return (
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.713 3.9375H3.28699C2.55895 3.9375 1.96875 4.5277 1.96875 5.25574V15.088C1.96875 15.8161 2.55895 16.4062 3.28699 16.4062H17.713C18.4411 16.4062 19.0312 15.8161 19.0312 15.088V5.25574C19.0312 4.5277 18.4411 3.9375 17.713 3.9375Z" stroke="white" stroke-width="1.3125" stroke-linejoin="round"/>
          <path d="M0.65625 17.0625H20.3438H0.65625Z" fill="black"/>
          <path d="M0.65625 17.0625H20.3438" stroke="white" stroke-width="1.3125" stroke-miterlimit="10" stroke-linecap="round"/>
          </svg>
        );
};


export const StatesIcon = () => {
  return (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.0007 20.1673C16.0633 20.1673 20.1673 16.0633 20.1673 11.0007C20.1673 5.93804 16.0633 1.83398 11.0007 1.83398C5.93804 1.83398 1.83398 5.93804 1.83398 11.0007C1.83398 16.0633 5.93804 20.1673 11.0007 20.1673Z" stroke="white" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.83398 11H20.1673" stroke="white" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.0007 1.83398C13.2935 4.34414 14.5965 7.60168 14.6673 11.0007C14.5965 14.3996 13.2935 17.6572 11.0007 20.1673C8.70781 17.6572 7.40479 14.3996 7.33398 11.0007C7.40479 7.60168 8.70781 4.34414 11.0007 1.83398Z" stroke="white" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          );
};

export const FeesIcon = () => {
  return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.334 3.33398H15.0007C15.4427 3.33398 15.8666 3.50958 16.1792 3.82214C16.4917 4.1347 16.6673 4.55862 16.6673 5.00065V16.6673C16.6673 17.1093 16.4917 17.5333 16.1792 17.8458C15.8666 18.1584 15.4427 18.334 15.0007 18.334H5.00065C4.55862 18.334 4.1347 18.1584 3.82214 17.8458C3.50958 17.5333 3.33398 17.1093 3.33398 16.6673V5.00065C3.33398 4.55862 3.50958 4.1347 3.82214 3.82214C4.1347 3.50958 4.55862 3.33398 5.00065 3.33398H6.66732" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.4993 1.66602H7.49935C7.03911 1.66602 6.66602 2.03911 6.66602 2.49935V4.16602C6.66602 4.62625 7.03911 4.99935 7.49935 4.99935H12.4993C12.9596 4.99935 13.3327 4.62625 13.3327 4.16602V2.49935C13.3327 2.03911 12.9596 1.66602 12.4993 1.66602Z" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      );
};

export const SettingsIcon = () => {
  return (
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_5733_4540)">
        <path d="M10.5 13.125C11.9497 13.125 13.125 11.9497 13.125 10.5C13.125 9.05025 11.9497 7.875 10.5 7.875C9.05025 7.875 7.875 9.05025 7.875 10.5C7.875 11.9497 9.05025 13.125 10.5 13.125Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.975 13.125C16.8585 13.3889 16.8238 13.6817 16.8752 13.9655C16.9267 14.2494 17.062 14.5113 17.2637 14.7175L17.3163 14.77C17.479 14.9325 17.608 15.1255 17.6961 15.338C17.7842 15.5504 17.8295 15.7781 17.8295 16.0081C17.8295 16.2381 17.7842 16.4658 17.6961 16.6783C17.608 16.8907 17.479 17.0837 17.3163 17.2462C17.1537 17.409 16.9607 17.538 16.7483 17.6261C16.5358 17.7142 16.3081 17.7595 16.0781 17.7595C15.8481 17.7595 15.6204 17.7142 15.408 17.6261C15.1955 17.538 15.0025 17.409 14.84 17.2462L14.7875 17.1937C14.5813 16.992 14.3194 16.8567 14.0355 16.8052C13.7517 16.7538 13.4589 16.7885 13.195 16.905C12.9362 17.0159 12.7155 17.2001 12.56 17.4348C12.4046 17.6696 12.3211 17.9447 12.32 18.2262V18.375C12.32 18.8391 12.1356 19.2842 11.8074 19.6124C11.4792 19.9406 11.0341 20.125 10.57 20.125C10.1059 20.125 9.66075 19.9406 9.33256 19.6124C9.00437 19.2842 8.82 18.8391 8.82 18.375V18.2962C8.81323 18.0066 8.71948 17.7257 8.55095 17.4901C8.38241 17.2545 8.14689 17.075 7.875 16.975C7.61109 16.8585 7.31833 16.8238 7.03449 16.8752C6.75064 16.9267 6.48872 17.062 6.2825 17.2637L6.23 17.3163C6.06747 17.479 5.87447 17.608 5.66202 17.6961C5.44957 17.7842 5.22185 17.8295 4.99187 17.8295C4.7619 17.8295 4.53418 17.7842 4.32173 17.6961C4.10928 17.608 3.91628 17.479 3.75375 17.3163C3.59104 17.1537 3.46196 16.9607 3.3739 16.7483C3.28583 16.5358 3.2405 16.3081 3.2405 16.0781C3.2405 15.8481 3.28583 15.6204 3.3739 15.408C3.46196 15.1955 3.59104 15.0025 3.75375 14.84L3.80625 14.7875C4.00797 14.5813 4.14329 14.3194 4.19475 14.0355C4.24622 13.7517 4.21148 13.4589 4.095 13.195C3.98408 12.9362 3.79991 12.7155 3.56516 12.56C3.3304 12.4046 3.05531 12.3211 2.77375 12.32H2.625C2.16087 12.32 1.71575 12.1356 1.38756 11.8074C1.05937 11.4792 0.875 11.0341 0.875 10.57C0.875 10.1059 1.05937 9.66075 1.38756 9.33256C1.71575 9.00437 2.16087 8.82 2.625 8.82H2.70375C2.99337 8.81323 3.27425 8.71948 3.50989 8.55095C3.74552 8.38241 3.925 8.14689 4.025 7.875C4.14148 7.61109 4.17622 7.31833 4.12475 7.03449C4.07329 6.75064 3.93797 6.48872 3.73625 6.2825L3.68375 6.23C3.52104 6.06747 3.39196 5.87447 3.3039 5.66202C3.21583 5.44957 3.1705 5.22185 3.1705 4.99187C3.1705 4.7619 3.21583 4.53418 3.3039 4.32173C3.39196 4.10928 3.52104 3.91628 3.68375 3.75375C3.84628 3.59104 4.03928 3.46196 4.25173 3.3739C4.46418 3.28583 4.6919 3.2405 4.92188 3.2405C5.15185 3.2405 5.37957 3.28583 5.59202 3.3739C5.80447 3.46196 5.99747 3.59104 6.16 3.75375L6.2125 3.80625C6.41872 4.00797 6.68064 4.14329 6.96448 4.19475C7.24833 4.24622 7.54109 4.21148 7.805 4.095H7.875C8.1338 3.98408 8.35451 3.79991 8.50998 3.56516C8.66545 3.3304 8.74888 3.05531 8.75 2.77375V2.625C8.75 2.16087 8.93437 1.71575 9.26256 1.38756C9.59075 1.05937 10.0359 0.875 10.5 0.875C10.9641 0.875 11.4092 1.05937 11.7374 1.38756C12.0656 1.71575 12.25 2.16087 12.25 2.625V2.70375C12.2511 2.98531 12.3346 3.2604 12.49 3.49516C12.6455 3.72991 12.8662 3.91408 13.125 4.025C13.3889 4.14148 13.6817 4.17622 13.9655 4.12475C14.2494 4.07329 14.5113 3.93797 14.7175 3.73625L14.77 3.68375C14.9325 3.52104 15.1255 3.39196 15.338 3.3039C15.5504 3.21583 15.7781 3.1705 16.0081 3.1705C16.2381 3.1705 16.4658 3.21583 16.6783 3.3039C16.8907 3.39196 17.0837 3.52104 17.2462 3.68375C17.409 3.84628 17.538 4.03928 17.6261 4.25173C17.7142 4.46418 17.7595 4.6919 17.7595 4.92188C17.7595 5.15185 17.7142 5.37957 17.6261 5.59202C17.538 5.80447 17.409 5.99747 17.2462 6.16L17.1937 6.2125C16.992 6.41872 16.8567 6.68064 16.8052 6.96448C16.7538 7.24833 16.7885 7.54109 16.905 7.805V7.875C17.0159 8.1338 17.2001 8.35451 17.4348 8.50998C17.6696 8.66545 17.9447 8.74888 18.2262 8.75H18.375C18.8391 8.75 19.2842 8.93437 19.6124 9.26256C19.9406 9.59075 20.125 10.0359 20.125 10.5C20.125 10.9641 19.9406 11.4092 19.6124 11.7374C19.2842 12.0656 18.8391 12.25 18.375 12.25H18.2962C18.0147 12.2511 17.7396 12.3346 17.5048 12.49C17.2701 12.6455 17.0859 12.8662 16.975 13.125Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_5733_4540">
        <rect width="21" height="21" fill="white"/>
        </clipPath>
        </defs>
        </svg>
      );
};


export const OrdersIcon = () => {
  return (
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.25 1.75L2.625 5.25V17.5C2.625 17.9641 2.80937 18.4092 3.13756 18.7374C3.46575 19.0656 3.91087 19.25 4.375 19.25H16.625C17.0891 19.25 17.5342 19.0656 17.8624 18.7374C18.1906 18.4092 18.375 17.9641 18.375 17.5V5.25L15.75 1.75H5.25Z" stroke="white" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2.625 5.25H18.375" stroke="white" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14 8.75C14 9.67826 13.6313 10.5685 12.9749 11.2249C12.3185 11.8813 11.4283 12.25 10.5 12.25C9.57174 12.25 8.6815 11.8813 8.02513 11.2249C7.36875 10.5685 7 9.67826 7 8.75" stroke="white" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        );
};



