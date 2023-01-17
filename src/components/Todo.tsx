import { ChangeEvent, useState } from 'react'

import {Trash} from 'phosphor-react';

import styles from './Todo.module.css';

interface TodoProps {
    content: string;
    conclused: boolean;
    deleteTodo: (contentToDo: string) => void;
    conclusedToDo: (contentTodo: string) => void;
}

export function Todo({content, conclused, deleteTodo, conclusedToDo}: TodoProps){

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        conclusedToDo(content)
    }

    return (
        <div className={styles.todo}>
            {/* <input 
                id="concluded" 
                type="checkbox" 
                name="concluded"
                onChange={handleChange}
            /> */}
            <label className={styles.container}>
                <input 
                     id="concluded" 
                    type="checkbox" 
                    name="concluded"
                    onChange={handleChange}
                />
                <span className={styles.checkmark}></span>
            </label>
            <p className={conclused ? styles.textTodoFalse : styles.textTodo}>
                {content}
            </p> 
            <Trash size={24} className={styles.trash} onClick={()=> deleteTodo(content)}/>
        </div>
    )
}