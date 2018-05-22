/*
 * @Author: ll
 * @Date: 2018-03-01 10:40:25
 * @Last Modified by: ll
 * @Last Modified time: 2018-03-01 22:49:44
 */
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import './index.less'

const prefixcls = 'Gmenu'

class Gmenu extends (Component || PureComponent) {
	render(){
		const { show,data } = this.props;
		const menuEl = (
			<ul className={prefixcls}>
				{data.map((val,i)=>
					<li key={i}>
						<span>{val.title}</span>
						<img src={val.iconUrl} alt={val.title} />
					</li>
				)}
			</ul>
		)
		return(
			<div>
				{show ? menuEl : null}
				{show ? <div className={`${prefixcls}-menu-mask`} onClick={this.props.onMaskClick} /> : null}
			</div>
		)
	}
}

const defaultProps = {
	show: false,
};

const propTypes = {
	show: PropTypes.bool.isRequired,
	data: PropTypes.array.isRequired,
	onMaskClick: PropTypes.func.isRequired,
};

Gmenu.defaultProps = defaultProps;
Gmenu.propTypes = propTypes;

export default Gmenu;
