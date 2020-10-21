import React, { Component } from 'react';
import Login from './Login';
import $ from 'jquery';


class Popup extends Component{
    componentDidMount(){
        $('.log_button').click(function(){
            $('.popup-bg').fadeIn(500);
            $('.log_in').css('display', 'block');
        });

        // $('.search_button').click(function(){
        //     $('.popup-bg').fadeIn(500);
        //     $('.log_in').css('display', 'none');
        // });

        // $('.don_button').click(function(){
        //     $('.popup-bg').fadeIn(500);
        //     $('.log_in').css('display', 'none');
        // });

        $('.popup-bg').click(function(){
            $('.popup-bg').fadeOut(500);
            $('.log_in').css('display', 'none');
        });
        
    }
    render(){
        return(
            <section>
                <Login/>
                <section className="popup-bg"></section>
            </section>
        )

    }
}

export default Popup