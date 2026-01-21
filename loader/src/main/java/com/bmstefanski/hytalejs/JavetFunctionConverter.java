package com.bmstefanski.hytalejs;

import com.caoccao.javet.exceptions.JavetException;
import com.caoccao.javet.interop.converters.JavetProxyConverter;
import com.caoccao.javet.values.V8Value;
import com.caoccao.javet.values.reference.V8ValueArray;
import com.caoccao.javet.values.reference.V8ValueFunction;

import com.caoccao.javet.interop.V8Runtime;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class JavetFunctionConverter extends JavetProxyConverter {
  @Override
  @SuppressWarnings("unchecked")
  protected <T extends V8Value> T toV8Value(V8Runtime v8Runtime, Object object, int depth) throws JavetException {
    if (object != null && isInternalJdkCollection(object.getClass())) {
      object = copyCollection(object);
    }
    return super.toV8Value(v8Runtime, object, depth);
  }

  private boolean isInternalJdkCollection(Class<?> clazz) {
    String name = clazz.getName();
    return name.startsWith("java.util.Collections$")
        || name.startsWith("java.util.ImmutableCollections$");
  }

  private Object copyCollection(Object object) {
    if (object instanceof Map<?, ?> map) {
      return new HashMap<>(map);
    }
    if (object instanceof List<?> list) {
      return new ArrayList<>(list);
    }
    if (object instanceof Set<?> set) {
      return new HashSet<>(set);
    }
    return object;
  }
  @Override
  @SuppressWarnings("unchecked")
  protected <T> T toObject(V8Value v8Value, int depth) throws JavetException {
    if (v8Value instanceof V8ValueFunction) {
      return (T) v8Value;
    }
    if (v8Value instanceof V8ValueArray v8Array) {
      return (T) convertArrayToJavaArray(v8Array, depth);
    }
    return super.toObject(v8Value, depth);
  }

  private Object convertArrayToJavaArray(V8ValueArray v8Array, int depth) throws JavetException {
    int length = v8Array.getLength();
    if (length == 0) {
      return new Object[0];
    }

    List<Object> elements = new ArrayList<>(length);
    Class<?> commonType = null;

    for (int i = 0; i < length; i++) {
      try (V8Value element = v8Array.get(i)) {
        Object converted = super.toObject(element, depth + 1);
        elements.add(converted);

        if (converted != null) {
          Class<?> elementClass = converted.getClass();
          if (commonType == null) {
            commonType = elementClass;
          } else if (!commonType.equals(elementClass)) {
            commonType = findCommonSuperclass(commonType, elementClass);
          }
        }
      }
    }

    if (commonType == null || commonType.equals(Object.class)) {
      return elements;
    }

    Object array = Array.newInstance(commonType, length);
    for (int i = 0; i < length; i++) {
      Array.set(array, i, elements.get(i));
    }
    return array;
  }

  private Class<?> findCommonSuperclass(Class<?> a, Class<?> b) {
    if (a.isAssignableFrom(b)) {
      return a;
    }
    if (b.isAssignableFrom(a)) {
      return b;
    }
    Class<?> superA = a.getSuperclass();
    while (superA != null && !superA.equals(Object.class)) {
      if (superA.isAssignableFrom(b)) {
        return superA;
      }
      superA = superA.getSuperclass();
    }
    return Object.class;
  }
}
