import React, { useEffect, useState }  from "react";
import axios from "axios";

import List from '../AddList/List';
import BadgeList from "../Badge/BadgeList";

import closeSvg from '../../assets/img/close.svg';

import './AddListButton.scss';



const AddButtonList = ({ colors, onAdd }) => {

    const [visiblePopup, setVisiblePopup] = useState(false);
    const [seletedColor, setSeletedColor] = useState(3);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(Array.isArray(colors)) {
            setSeletedColor(colors[0].id);
        }
        
    }, [colors]);

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        setSeletedColor(colors[0].id);
    }

    const addList = () => {
        if(!inputValue) {
            alert('Введите название списка');
            return;
        }
        setIsLoading(true);
        axios
        .post('http://localhost:3001/lists', { 
            name: inputValue, 
            colorId: seletedColor 
        })
        .then(({data}) => {
            const color = colors.filter(c => c.id === seletedColor)[0].name;
            const listObj = {...data, color: { name: color}};
            onAdd(listObj);
            onClose();
        })
        .catch(() => {
            alert('Произошла ошибка при добавлении списка');
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    return(
        <div className="add-list">
        <List 
        onClick={() => setVisiblePopup(true)}
            items={[
            {
                className: "list__add-button",
                icon: ( 
            <svg 
                width="12" 
                height="12" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                >
            <path 
                d="M8 1V15" 
                stroke="black" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"/>
            <path 
                d="M1 8H15" 
                stroke="black" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"/>
            </svg>
            ),
            name: 'Добавить список'
            },
        ]}
        />
        {visiblePopup &&
            <div className="add-list__popup">
            <img 
                onClick={onClose}
                src={closeSvg} 
                alt="Close button" 
                className="add-list__popup-close-btn"/>

                <input 
                value={inputValue} 
                onChange={e => setInputValue(e.target.value)}
                className="field" 
                type='text' 
                placeholder="Название списка"/>

                <div className="add-list__popup-colors">
                    {
                        colors.map(color => (
                            <BadgeList 
                                onClick={() => setSeletedColor(color.id)}
                                key={color.id} 
                                color={color.name}
                                className={seletedColor === color.id && 'active'}
                                />
                        ))
                    }
                </div>

                <button onClick={addList} className="button">
                    {isLoading ? 'Добавление...' : 'Добавить'}
                </button>
            </div>
        } 
        </div>
        
    );
};

export default AddButtonList;