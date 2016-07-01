reformat_date = function(date_string){
	new_date_string = '';	

	if(date_string.substring(5,7) == '01'){
		new_date_string += 'Jan';
	}else if(date_string.substring(5,7) == '02'){
		new_date_string += 'Feb';
	}else if(date_string.substring(5,7) == '03'){
		new_date_string += 'Mar';
	}else if(date_string.substring(5,7) == '04'){
		new_date_string += 'Apr';
	}else if(date_string.substring(5,7) == '05'){
		new_date_string += 'May';
	}else if(date_string.substring(5,7) == '06'){
		new_date_string += 'Jun';
	}else if(date_string.substring(5,7) == '07'){
		new_date_string += 'Jul';
	}else if(date_string.substring(5,7) == '08'){
		new_date_string += 'Aug';
	}else if(date_string.substring(5,7) == '09'){
		new_date_string += 'Sep';
	}else if(date_string.substring(5,7) == '10'){
		new_date_string += 'Oct';
	}else if(date_string.substring(5,7) == '11'){
		new_date_string += 'Nov';
	}else if(date_string.substring(5,7) == '12'){
		new_date_string += 'Dec';
	}

	if(date_string.substring(8,10) == '01'){
		new_date_string += ' 1st';
	}else if(date_string.substring(8,10) == '02'){
		new_date_string += ' 2nd';
	}else if(date_string.substring(8,10) == '3'){
		new_date_string += ' 3rd';
	}else{
		new_date_string += ' '+date_string.substring(8,10)+'th';
	}

	new_date_string += ' '+date_string.substring(0,4);
	return new_date_string;
}