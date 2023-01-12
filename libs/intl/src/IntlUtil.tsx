/*
 *    Copyright 2023 CROZ d.o.o, the original author or authors.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

import React from "react";

import IntlMessageFormat from "intl-messageformat";

import { IntlParams, IntlRender } from "./IntlTypes";
import { Dictionary, LanguageTranslation } from "./IntlTypes";

export interface MessageData {
  name: string;
  params: IntlParams | undefined;
  render: IntlRender | undefined;
}

export class IntlUtil {
  private readonly _paramRegex = /({[^}]+})/g;
  private readonly TYPE_ZERO = "zero";
  private readonly _dictionary: Dictionary;
  private readonly _lang: string;
  private readonly _pr: Intl.PluralRules;

  constructor(dictionary: Dictionary, lang: string) {
    this._dictionary = dictionary;
    this._lang = lang;
    this._pr = new window.Intl.PluralRules(lang);

    if (!window.intlCache) {
      window.intlCache = {};
    }
  }

  translate(messageData: MessageData) {
    const translation = this._dictionary.translations?.[this._lang]?.[messageData.name];
    if (!translation) {
      return this.parse(this._dictionary.messages[messageData.name], messageData, true);
    }

    const { phrase, isReference } = this.getPhrase(translation, messageData);
    return this.parse(phrase, messageData, isReference);
  }

  getPhrase(translation: LanguageTranslation, messageData: MessageData) {
    for (const param of this.getParams(translation)) {
      const paramType = this.getPluralRule(
        (messageData.params?.[param] as number) || 0,
        !!translation?.[this.TYPE_ZERO]
      );

      if (!translation?.[paramType]) {
        return { phrase: this._dictionary.messages[messageData.name], isReference: true };
      }

      translation = translation[paramType];
    }

    return { phrase: translation as string, isReference: false };
  }

  getPluralRule(n: number, useZero: boolean) {
    return n === 0 && useZero ? this.TYPE_ZERO : this._pr.select(n);
  }

  getParams(translation: LanguageTranslation) {
    if (typeof translation !== "string") {
      return translation.paramOrder as string[];
    }
    return [];
  }

  parse(phrase: string, messageData: MessageData, isReference = false) {
    const parts = phrase.split(this._paramRegex);
    const formats = this.getFormats(
      this._dictionary.messages[messageData.name] ||
        this._dictionary.translations[this._lang][messageData.name].toString()
    );

    const toRender: React.ReactNode[] = [];
    for (const part of parts) {
      if (part.startsWith("{") && messageData.params) {
        const param = this.extractParam(part, isReference);
        const formattedParam = this.formatParam(param, formats, messageData);

        if (messageData.render?.[param]) {
          toRender.push(messageData.render[param](formattedParam));
        } else {
          toRender.push(formattedParam);
        }
      } else {
        toRender.push(part);
      }
    }

    return toRender;
  }

  getFormats(referencePhrase: string) {
    let formats = window.intlCache?.[referencePhrase];
    if (!formats) {
      formats = {};

      for (const f of referencePhrase.match(this._paramRegex) || []) {
        formats = { ...formats, [f.split(",")[0].slice(1)]: f };
      }

      window.intlCache[referencePhrase] = formats;
    }

    return formats;
  }

  extractParam(part: string, isReference: boolean) {
    let param = part.slice(1, -1).trim();

    if (isReference) {
      param = param.split(",")[0];
    }

    return param;
  }

  formatParam(param: string, formats: Record<string, string>, messageData: MessageData) {
    let formattedParam;

    if (formats[param]) {
      let imf = window.intlCache[formats[param] + this._lang];
      if (!imf) {
        imf = new IntlMessageFormat(formats[param], this._lang);
        window.intlCache[formats[param] + this._lang] = imf;
      }

      formattedParam = imf.format({ [param]: messageData.params?.[param] });
    } else {
      formattedParam = messageData.params?.[param];
    }

    return formattedParam;
  }
}
