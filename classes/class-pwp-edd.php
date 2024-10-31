<?php

class PortfolioWP_Portfolio_EDD {
	public static $valid = false;

	public function __construct()
	{
		$status = get_option( 'edd_portfoliowp_license_status' );

		if ( 'valid' === $status || self::is_wpcom() ) {
			self::$valid = true;
		}
	}

	public static function is_valid()
	{
		return self::$valid;
	}

	public static function is_wpcom()
    {
        return defined('IS_ATOMIC') && IS_ATOMIC && defined('ATOMIC_CLIENT_ID') && '2' === ATOMIC_CLIENT_ID;
    }
}