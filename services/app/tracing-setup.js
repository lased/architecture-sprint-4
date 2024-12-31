const {
  BasicTracerProvider,
  SimpleSpanProcessor,
} = require('@opentelemetry/sdk-trace-base');
const {
  OTLPTraceExporter,
} = require('@opentelemetry/exporter-trace-otlp-http');

const exporter = new OTLPTraceExporter({
  url: 'http://jaeger-all-in-one:4318/v1/traces',
});

const TracerProvider = new BasicTracerProvider({
  spanProcessors: [new SimpleSpanProcessor(exporter)],
});

TracerProvider.register();

// Экспорт трассировщика для использования в приложении
module.exports = { tracer: TracerProvider.getTracer('app') };
