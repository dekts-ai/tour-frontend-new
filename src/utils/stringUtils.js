class StringUtils{
    /**
     * input ( "true" ) -> output( true )
     * @param string s input string value
     * @returns str
     */
    static toBool(s){
        return ( s === true || s === "true" || s === 1 || s === "1" || s.toString().toLowerCase() === "y" || s.toString().toLowerCase() === "yes") ? true : false
    }
    /**
     * input( $1,000.10 ) -> output( 1000.1 )
     * @param string s input string value
     * @returns str
     */
    static toFloat(s){
        return parseFloat(s.toString().replace(/[^0-9.]/gi, ""));
    }
    /**
     * input(11 A This is - my_id) -> output( idathismyid )
     * @param string s input string value
     * @return str
     */
    static toId(s, prefix="id"){
        const id = s.toString().replace(/[^a-zA-Z0-9]/gi, '').toLowerCase();
        return `${prefix}${id}`;
    }
}

export { StringUtils };