const EyeClose = ({...props}) => {
    return (
        <svg
            width={21}
            height={21}
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M17.917 5.954c-3.939-3.939-10.347-3.939-14.286 0L1 8.584l2.696 2.697a10.07 10.07 0 007.143 2.954 10.07 10.07 0 007.144-2.954l2.63-2.631-2.696-2.696zm-.403 4.859c-3.68 3.68-9.669 3.68-13.35 0L1.938 8.585l2.162-2.163c3.68-3.68 9.67-3.68 13.35 0l2.227 2.228-2.162 2.162z"
                fill="#000"
                stroke="#000"
                strokeWidth={0.544815}
            />
            <g filter="url(#filter0_d_13818_337)">
                <path
                d="M10.999 11.908a3.4 3.4 0 01-1.799-.512.297.297 0 00-.313.503A3.989 3.989 0 0011 12.5c2.205 0 4-1.795 4-4 0-.796-.233-1.564-.674-2.223a.296.296 0 00-.493.33c.376.56.574 1.215.574 1.893A3.411 3.411 0 0111 11.908z"
                fill="#000"
                />
                <path
                d="M10.999 11.908a3.4 3.4 0 01-1.799-.512.297.297 0 00-.313.503A3.989 3.989 0 0011 12.5c2.205 0 4-1.795 4-4 0-.796-.233-1.564-.674-2.223a.296.296 0 00-.493.33c.376.56.574 1.215.574 1.893A3.411 3.411 0 0111 11.908z"
                stroke="#000"
                strokeWidth={0.2}
                />
            </g>
            <path
                d="M11 5.093c.612 0 1.212.163 1.735.474a.296.296 0 00.302-.51 4.004 4.004 0 00-5.63 5.203.297.297 0 00.532-.26A3.412 3.412 0 0111 5.092z"
                fill="#000"
                stroke="#000"
                strokeWidth={0.2}
            />
            <path
                d="M18.313 1.014a.476.476 0 11.673.674l-.674-.674zm0 0l-16.3 16.299a.476.476 0 10.675.673L18.986 1.688l-.674-.674z"
                fill="#000"
                stroke="#000"
                strokeWidth={0.252109}
            />
            <defs>
                <filter
                id="filter0_d_13818_337"
                x={4.64746}
                y={6.04688}
                width={14.4514}
                height={14.5547}
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
                >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy={4} />
                <feGaussianBlur stdDeviation={2} />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_13818_337"
                />
                <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_13818_337"
                    result="shape"
                />
                </filter>
            </defs>
        </svg>
    )
  }
  
  export default EyeClose