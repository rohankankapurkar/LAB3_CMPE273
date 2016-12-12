package com.sjsu;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class WebMain {

	public int called(String name) throws ScriptException{
		System.out.println("inside web service");
		System.out.println("printing the name" + name);
		
		
		ScriptEngineManager mgr = new ScriptEngineManager();
	    ScriptEngine engine = mgr.getEngineByName("JavaScript");
	    String foo = name;
	    try {
			System.out.println(engine.eval(foo));
			System.out.println(engine.eval(foo).getClass().getName()+ "printing the type");
		} catch (ScriptException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return  (int)engine.eval(foo);
	}
	
	
	public void register(String username, String password, String firstname, String lastname )
	{
		System.out.println("inside the register functon"+username);
		Connection conn = ConnectionMgmt.connect();
		PreparedStatement stmt = null;
		ResultSet rs = null;
		try {
			

			String query = "insert into users (username,password,firstname,lastname) values (?,?,?,?) ";
			stmt = conn.prepareStatement(query);
			stmt.setString(1, username);
			stmt.setString(2, password);
			stmt.setString(3, firstname);
			stmt.setString(4, lastname);

			
			stmt.execute();

		} catch (SQLException e) {
			
			e.printStackTrace();
		}
	}
	
	
	public void info1(String username )
	{
		System.out.println("inside the info1 functon"+username);
		Connection conn = ConnectionMgmt.connect();
		PreparedStatement stmt = null;
		ResultSet rs = null;
		try {
			

			String query = "select * from users where username =  ? ";
			stmt = conn.prepareStatement(query);
			stmt.setString(1, username);
			

			
			rs = stmt.executeQuery();

		} catch (SQLException e) {
			
			e.printStackTrace();
		}
	}
	
	
	
	public void sell(String p_name, String p_price, String p_disc, String username )
	{
		System.out.println("inside the sell functon"+username);
		Connection conn = ConnectionMgmt.connect();
		PreparedStatement stmt = null;
		ResultSet rs = null;
		try {
			

			String query = "insert into product (p_name,p_price,p_disc,username) values (?,?,?,?) ";
			stmt = conn.prepareStatement(query);
			stmt.setString(1, p_name);
			stmt.setString(2, p_price);
			stmt.setString(3, p_disc);
			stmt.setString(4, username);

			

			
			stmt.execute();

		} catch (SQLException e) {
			
			e.printStackTrace();
		}
	}
	
	
	public void addToCart(String user_id, String p_id )
	{
		System.out.println("inside the add to cart function functon");
		Connection conn = ConnectionMgmt.connect();
		PreparedStatement stmt = null;
		ResultSet rs = null;
		try {
			

			String query = "insert into cart (user_id,p_id) values (?,?) ";
			stmt = conn.prepareStatement(query);
			stmt.setString(1, user_id);
			stmt.setString(2, p_id);
			

			

			
			stmt.execute();

		} catch (SQLException e) {
			
			e.printStackTrace();
		}
	}
	
	
	
	
	

	
	
	
}





