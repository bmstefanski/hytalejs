package com.bmstefanski.hytalejs;

public interface ScriptValue extends AutoCloseable {
  boolean isExecutable();

  void executeVoid(Object... args);

  boolean hasArrayElements();

  long getArraySize();

  ScriptValue getArrayElement(long index);

  boolean hasMember(String name);

  ScriptValue getMember(String name);

  String asString();

  void setMember(String name, Object value);

  void removeMember(String name);

  Object unwrap();

  ScriptRuntime getRuntime();

  @Override
  void close();
}
