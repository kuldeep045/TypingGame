import React from 'react'

function UserTyping({userInput, className} : {  userInput: string, className: string}) {
    const typedChar = userInput.split('')
    return (
    <div className={className}>
        {
            typedChar.map((char, index)=>{
                return <span className='text-amber-300 opacity-0' key={`${char}-${index}`}>
                    {char}
                </span>
            })
        }
        
    </div>
  )
}

export default UserTyping