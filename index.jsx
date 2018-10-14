import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import ThreeSixty from 'threesixtyClass';

export default class ThreeSixtyImage extends React.Component {
    static propTypes = {
        image: PropTypes.string,
        id: PropTypes.string
    }
    constructor(props) {
        super(props);
    }

    componentWillMount(props) {

    }

    componentWillReceiveProps(newProps) {

    }

    componentDidMount(props) {
        var ts = new ThreeSixty(document.getElementById(this.props.id), {
            image: this.props.image,
            count: 24,
            perRow: 8,
            width: 328,
            height: 328,
        });
    }
    render() {

        return (
            <div id={this.props.id}>
            </div>
        );
    }
}