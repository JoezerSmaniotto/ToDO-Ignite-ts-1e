import {PlusCircle, ClipboardText} from 'phosphor-react';

import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import styles from './Content.module.css'

import { Todo } from './Todo';

interface ToDo {
    content: string;
    conclused: boolean;
}

export function Content (){

    const [todos, setTodos] = useState<ToDo[]>([]);
    const [newTodoText, setNewTodoText] = useState("");

    function handleCreateNewComment(event: FormEvent){
        event.preventDefault();
        setTodos([...todos, { content: newTodoText, conclused: false}])
        setNewTodoText('')
    }
    
    function handleNewCommentChange(event: ChangeEvent<HTMLInputElement>){
        event.target.setCustomValidity('')
        setNewTodoText(event.target.value)
    }

    
    function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>){
        event.target.setCustomValidity("Este campo é obrigatório!")
    }
    
    function deleteToDo(contentTodo: string){
        const commentsWithouDeleteOne = todos.filter(todo=>{
            return todo.content !== contentTodo;
        })
        setTodos(commentsWithouDeleteOne)
    }


    function conclusedToDo(contentTodo: string){
        const commentsWithouDeleteOne = todos.map(todo=>{
            if(todo.content === contentTodo){
                return {...todo, conclused: !todo.conclused}
            }else{
                return todo;
            }  
        })
        setTodos(commentsWithouDeleteOne)
    }


    const isNewCommentEmpty = newTodoText.length === 0; 

    
    function toDoConclused(): number {
        let todosConclused = todos.filter((todo) => todo.conclused === true)
        return todosConclused.length;
    }


    return (
        <div className={styles.wrapper}>
             <form onSubmit={handleCreateNewComment}  className={styles.commentForm}>
                
                <input 
                    name="coment"
                    value={newTodoText}
                    placeholder='Adicicione uma nova tarrefa'
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid} /*Essa propriedade é chamada, sempre que tento fazer um onSubmit mais o texto é invlaido */
                    required
                />
                
                <button type="submit" disabled={isNewCommentEmpty} >Criar 
                
                   <PlusCircle size={16} />
                 </button>
                
            </form>


            <div className={styles.containerToDo}>

                <div className={styles.infos}>
                    <div className={styles.allcreated}>
                        <span>Tarefaz criadas</span>
                        <span>{todos.length}</span>
                    </div>

                    <div className={styles.done}>
                        <span>Concluídas</span>
                        <span>{toDoConclused()} de {todos.length}</span>
                    </div>
                </div>

                 <div className={styles.toDos}>
                    { todos.length > 0 &&
                        todos.map((todo) =>{
                            return(
                                <Todo 
                                    key={todo.content} 
                                    content={todo.content} 
                                    conclused={todo.conclused} 
                                    deleteTodo={deleteToDo}
                                    conclusedToDo={conclusedToDo}
                                />
                            )
                        })
                           
                    }

                    {
                        todos.length === 0 &&
                        <div className={styles.emptyContent}>
                          
                            <ClipboardText size={56} weight="thin" className={styles.icon}/>

                            <p className={styles.fristMensage}>Você ainda não tem tarefaz cadastradas</p>
                            <p className={styles.secondMensage}>Crie tarefas e organize seus itens a fazer</p>
                        </div>
                    }
                </div>

            </div>


    
        </div>
    )
} 