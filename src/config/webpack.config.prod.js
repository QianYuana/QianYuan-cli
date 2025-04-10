import path from 'path';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default function applyWebpackConfig(dihogConfig, paths, argv) {
  const isEnvProduction = true;
  
  // 处理 alias 配置
  const alias = {
    '@': paths.appSrc,
    ...(dihogConfig.alias || {})
  };

  // 将相对路径转换为绝对路径
  Object.keys(alias).forEach(key => {
    if (typeof alias[key] === 'string' && !path.isAbsolute(alias[key])) {
      alias[key] = path.resolve(paths.appPath, alias[key]);
    }
  });

  // 处理入口文件
  const entry = {};
  if (typeof dihogConfig.entry === 'string') {
    entry.main = dihogConfig.entry;
  } else if (typeof dihogConfig.entry === 'object') {
    Object.assign(entry, dihogConfig.entry);
  }

  // 处理 publicPath
  const publicPath = dihogConfig.publicPath || './';
  
  return {
    mode: 'production',
    bail: true,
    devtool: 'source-map',
    entry,
    output: {
      path: paths.outputPath,
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
      publicPath: publicPath,
      clean: true
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true
            }
          }
        }),
        new CssMinimizerPlugin()
      ],
      splitChunks: {
        chunks: 'all',
        name: false
      },
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`,
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript'
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread'
              ]
            }
          }
        },
        {
          test: /\.(scss|sass|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    'autoprefixer'
                  ]
                }
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024
            }
          },
          generator: {
            filename: 'assets/[name].[contenthash:8][ext]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: 'asset/resource',
          generator: {
            filename: 'static/fonts/[name].[contenthash:8][ext]'
          }
        }
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(paths.appPath, 'src/index.ejs'),
        publicPath: publicPath,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(paths.appPath, 'public/assets'),
            to: path.resolve(paths.outputPath, 'assets'),
            noErrorOnMissing: true
          }
        ]
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      alias
    },
  };
}
