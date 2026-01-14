# Architecture Documentation

Technical deep dive into how TypeScript plugins work on Hytale server.

## Component Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Hytale Server                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │           Plugin Manager                          │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │    HytaleScriptLoader (JavaPlugin)          │  │  │
│  │  │  ┌───────────────────────────────────────┐  │  │  │
│  │  │  │   GraalVM Polyglot Context           │  │  │  │
│  │  │  │  ┌─────────────────────────────────┐  │  │  │  │
│  │  │  │  │  JavaScript Runtime             │  │  │  │  │
│  │  │  │  │  ┌───────────────────────────┐  │  │  │  │  │
│  │  │  │  │  │  demo.js (TypeScript)     │  │  │  │  │  │
│  │  │  │  │  └───────────────────────────┘  │  │  │  │  │
│  │  │  │  └─────────────────────────────────┘  │  │  │  │
│  │  │  └───────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Class Hierarchy

### Java Side

```
JavaPlugin (Hytale API)
    ↑
    │ extends
    │
HytaleScriptLoader
    │
    ├── Context (GraalVM)
    │   └── JavaScript Engine
    │       └── Loaded Scripts (.js files)
    │
    ├── ScriptEventHandler (record)
    │   ├── String eventType
    │   └── Value callback
    │
    └── Event Wrappers
        └── ScriptPlayerConnectEvent
            └── PlayerConnectEvent (wrapped)
```

### TypeScript Side

```
types.ts
    ├── Interfaces
    │   ├── PlayerConnectEvent
    │   ├── HytaleLogger
    │   └── EventHandler
    │
    ├── Decorator
    │   └── @EventListener(eventType)
    │
    └── Global Variables
        ├── logger: HytaleLogger
        └── plugin: JavaPlugin

demo.ts
    └── HelloWorldPlugin
        └── @EventListener('PlayerConnectEvent')
            └── onPlayerJoin(event)
```

## Data Flow

### 1. Plugin Loading

```
Server Start
    ↓
PluginManager.loadPlugin()
    ↓
HytaleScriptLoader.setup()
    ↓
Create GraalVM Context
    ↓
context.getBindings("js").putMember("logger", ...)
context.getBindings("js").putMember("plugin", ...)
    ↓
loadScripts()
    ↓
For each .js file:
    context.eval("js", scriptContent)
    ↓
    Extract handlers array from result
    ↓
    Store ScriptEventHandler(eventType, callback)
    ↓
Register Java event listeners
    ↓
HytaleScriptLoader.start()
```

### 2. Event Handling

```
Player Joins Server
    ↓
Hytale fires PlayerConnectEvent
    ↓
EventBus.dispatch(PlayerConnectEvent)
    ↓
HytaleScriptLoader.onPlayerConnect(PlayerConnectEvent)
    ↓
Wrap in ScriptPlayerConnectEvent (Java → JS bridge)
    ↓
For each registered handler:
    if (handler.eventType == "PlayerConnectEvent")
        handler.callback.execute(scriptEvent)
    ↓
GraalVM executes JavaScript function
    ↓
TypeScript code runs:
    event.getPlayerName()
    logger.at(LogLevel.INFO).log(...)
    ↓
Java methods invoked via GraalVM host access
    ↓
Console output
```

## Key Technologies

### GraalVM Polyglot API

**Purpose**: Execute JavaScript code within Java process

**Configuration**:
```java
Context.newBuilder("js")
    .allowHostAccess(HostAccess.ALL)        // JS can call Java
    .allowHostClassLookup(className -> true) // JS can access Java classes
    .allowIO(true)                           // JS can do file I/O
    .option("js.esm-eval-returns-exports", "true") // Support ES modules
    .build();
```

**Key Methods**:
- `context.eval("js", code)` - Execute JavaScript
- `context.getBindings("js").putMember(name, obj)` - Inject Java objects
- `value.execute(args)` - Call JavaScript function from Java
- `value.getMember(name)` - Access JavaScript object properties

### TypeScript Decorators

**Purpose**: Declarative event registration

**How it works**:
```typescript
export function EventListener(eventType: string) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    handlers.push({
      eventType: eventType,
      callback: originalMethod
    });

    return descriptor;
  };
}
```

At compile time, TypeScript transforms:
```typescript
class Plugin {
  @EventListener('PlayerConnectEvent')
  onPlayerJoin(event: PlayerConnectEvent) { }
}
```

Into:
```javascript
class Plugin {
  onPlayerJoin(event) { }
}
EventListener('PlayerConnectEvent')(Plugin.prototype, 'onPlayerJoin', descriptor);
```

The decorator runs and populates the `handlers` array.

### Event Bridge Pattern

Java events are wrapped before passing to JavaScript:

```java
public class ScriptPlayerConnectEvent {
    private final PlayerConnectEvent event;

    public String getPlayerName() {
        return event.getPlayerRef().getName();
    }
}
```

**Benefits**:
- Exposes only necessary methods to JavaScript
- Hides complex Hytale internals
- Provides clean, documented API surface
- Allows method name customization

## Security Considerations

### Host Access

Current configuration: `HostAccess.ALL`

**Allows**:
- JavaScript calling any public Java method
- JavaScript accessing any public Java field
- JavaScript instantiating Java classes

**Risks**:
- Malicious scripts could access sensitive APIs
- File system manipulation
- Network access
- Reflection-based attacks

**Mitigations** (not implemented in demo):
- Use `HostAccess.EXPLICIT` with `@HostAccess.Export` annotations
- Sandbox the Context with custom ClassLoader
- Implement permission system for scripts
- Validate script signatures before loading

### Class Loading

Current configuration: `allowHostClassLookup(className -> true)`

**Allows**:
- Scripts can load any Java class via `Java.type('com.example.Class')`

**Mitigations**:
- Whitelist allowed classes
- Block access to reflection APIs
- Prevent loading of sensitive classes

## Performance Characteristics

### Initialization

- Context creation: ~50-200ms
- Script loading: ~10-50ms per script
- Total overhead: ~100-500ms on server start

### Runtime

- Event dispatch: ~0.1-1ms per event
- GraalVM overhead: ~10-50% vs native Java
- Memory: ~50-200MB for JS runtime

### Optimization Opportunities

1. **Context Isolation**: Create separate contexts per script
2. **Lazy Loading**: Load scripts on-demand
3. **Compilation Cache**: Pre-compile scripts to bytecode
4. **Native Images**: Use GraalVM Native Image for faster startup

## Extension Points

### Adding Event Types

1. Create wrapper class:
```java
public class ScriptPlayerChatEvent {
    private final PlayerChatEvent event;
    public String getMessage() { return event.getMessage(); }
    public void setMessage(String msg) { event.setMessage(msg); }
}
```

2. Register listener:
```java
getEventRegistry().register(PlayerChatEvent.class, this::onPlayerChat);

private void onPlayerChat(PlayerChatEvent event) {
    for (ScriptEventHandler handler : eventHandlers) {
        if ("PlayerChatEvent".equals(handler.eventType())) {
            handler.callback().execute(new ScriptPlayerChatEvent(event));
        }
    }
}
```

3. Add TypeScript types:
```typescript
export interface PlayerChatEvent {
  getMessage(): string;
  setMessage(message: string): void;
}
```

### Adding Global APIs

Inject Java objects as global variables:

```java
jsContext.getBindings("js").putMember("server", HytaleServer.get());
jsContext.getBindings("js").putMember("world", someWorld);
```

Then use in TypeScript:
```typescript
declare const server: HytaleServer;
declare const world: World;

server.broadcastMessage("Hello!");
```

### Hot Reload

To support hot reload:

1. Watch scripts directory for changes
2. On change, reload specific script
3. Unregister old handlers
4. Re-evaluate script
5. Register new handlers

```java
WatchService watcher = FileSystems.getDefault().newWatchService();
scriptsDir.register(watcher, ENTRY_MODIFY);

while (true) {
    WatchKey key = watcher.take();
    for (WatchEvent<?> event : key.pollEvents()) {
        Path changed = (Path) event.context();
        reloadScript(changed);
    }
}
```

## Testing Strategy

### Unit Tests (Java)

Test script loading and event dispatching:

```java
@Test
void testScriptLoading() {
    Context ctx = Context.newBuilder("js")
        .allowHostAccess(HostAccess.ALL)
        .build();

    Value result = ctx.eval("js", "const handlers = []; handlers;");
    assertTrue(result.hasArrayElements());
}
```

### Integration Tests (JavaScript)

Mock Hytale APIs and test handlers:

```javascript
const mockLogger = {
  at: (level) => ({
    log: (msg, ...args) => console.log(msg, ...args)
  })
};

global.logger = mockLogger;

const event = {
  getPlayerName: () => "TestPlayer"
};

plugin.onPlayerJoin(event);
```

### Manual Testing

Use provided demo and verify console output.

## Future Improvements

1. **Package Manager Integration**
   - NPM packages for Hytale type definitions
   - Shared libraries between plugins

2. **Debugging Support**
   - Source map support for TypeScript
   - Chrome DevTools integration
   - Breakpoint debugging

3. **Async/Await**
   - Support for async event handlers
   - Promise-based APIs

4. **Module System**
   - Import/export between scripts
   - Dependency management

5. **Performance Monitoring**
   - Script execution time tracking
   - Memory usage metrics
   - Performance profiling tools
