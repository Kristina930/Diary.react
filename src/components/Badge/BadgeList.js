import React from 'react';
import classNames from 'classnames';

import './badge.scss';

const BadgeList = ({color, onClick, className }) => 
    <i 
    onClick={onClick} 
    className={classNames('badge', {[`badge--${color}`]: color}, className)}>
    </i>;

export default BadgeList;
