import React from 'react'

function IconBtn({text,onClick,children,disabled,outline=false,customType,type}) {
  return (
    <div>
        <button
        disabled={disabled}
        onClick={onClick}>
            {
                children ? (
                    <>
                        <span>
                            {text}
                        </span>
                        {children}
                    </>
                ) : (text)
            }
        </button>
    </div>
  )
}

export default IconBtn