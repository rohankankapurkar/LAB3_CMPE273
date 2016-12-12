package com.sjsu;

import java.util.*;
import java.sql.*;

class ConnectionPooling
{

 String databaseUrl = "jdbc:mysql://localhost:3306/test";
 String userName = "root";
 String password = "SonyVaio";

 Vector connectionPool = new Vector();

 public ConnectionPooling()
 {
  initialize();
 }

 public ConnectionPooling(String databaseUrl,String userName,String password)
 {
  this.databaseUrl = databaseUrl;
  this.userName = userName;
  this.password = password;
  initialize();
 }

 private void initialize()
 {
  //Here we can initialize all the information that we need
  initializeConnectionPool();
 }

 private void initializeConnectionPool()
 {
  while(!checkIfConnectionPoolIsFull())
  {
   connectionPool.addElement(createNewConnectionForPool());
  }
  System.out.println("Connection Pool is full.");
 }

 private synchronized boolean checkIfConnectionPoolIsFull()
 {
  final int MAX_POOL_SIZE = 50;

  if(connectionPool.size() < 50)
  {
   return false;
  }

  return true;
 }

 //Creating a connection here 
 private Connection createNewConnectionForPool()
 {
  Connection connection = null;

  try
  {
   Class.forName("com.mysql.jdbc.Driver");
   connection = DriverManager.getConnection(databaseUrl, userName, password);
  }
  catch(SQLException sqle)
  {
   return null;
  }
  catch(ClassNotFoundException cnfe)
  {
   return null;
  }

  return connection;
 }

 public synchronized Connection getConnectionFromPool()
 {
  Connection connection = null;

  if(connectionPool.size() > 0)
  {
   connection = (Connection) connectionPool.firstElement();
   connectionPool.removeElementAt(0);
  }
  return connection;
 }

 public synchronized void returnConnectionToPool(Connection connection)
 {
  connectionPool.addElement(connection);
 }

 public static void main(String args[])
 {
  ConnectionPooling ConnectionPoolManager = new ConnectionPooling();
 }

}


