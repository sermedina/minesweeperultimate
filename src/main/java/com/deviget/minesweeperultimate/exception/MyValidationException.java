
package com.deviget.minesweeperultimate.exception;

import java.util.Map;

/**
 *
 * @author smedina
 */

public class MyValidationException extends RuntimeException {


	private static final long serialVersionUID = 8347119250363399412L;

	private Map errors;

	public MyValidationException(Map errors) {
		this.errors = errors;
	}

	public Map getErrors() {
		return errors;
	}
}