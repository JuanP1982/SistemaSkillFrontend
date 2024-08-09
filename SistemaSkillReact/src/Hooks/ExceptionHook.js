import React from 'react'

export const ExceptionHook = (exception) => {
    const split =exception.response.data.split(':')
    const mensagem = split[2]
    return mensagem
}
