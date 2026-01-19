package com.bmstefanski.hytalejs;

import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Value;

public class GraalScriptRuntime implements ScriptRuntime {
  private final Context context;

  public GraalScriptRuntime(Context context) {
    this.context = context;
  }

  public Context getContext() {
    return context;
  }

  @Override
  public void enter() {
    context.enter();
  }

  @Override
  public void leave() {
    context.leave();
  }

  @Override
  public void eval(String script) {
    context.eval("js", script);
  }

  @Override
  public void setGlobal(String name, Object value) {
    context.getBindings("js").putMember(name, value);
  }

  @Override
  public ScriptValue getGlobal(String name) {
    Value bindings = context.getBindings("js");
    Value member = bindings.getMember(name);
    return member == null ? null : new GraalScriptValue(member);
  }
}
