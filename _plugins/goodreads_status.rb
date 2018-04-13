#Liquid Tag for Last # Goodreads status updates for given account
# by: Ryan Lanciaux
# url: ryanlanciaux.com
#
# Example usage: {% goodreads %}
require 'net/http'
require 'rexml/document'
require 'date'
require 'fileutils'

module Jekyll
  class GoodreadsStatus < Liquid::Tag
    def initialize(*)
      config = Jekyll.configuration({})['goodreads']
      @max_displayed = config['max_displayed']
      url = "https://www.goodreads.com/review/list/#{config['userid']}.xml?key=#{config['api_key']}&v=2&shelf=currently-reading"
      xml = Net::HTTP.get_response(URI.parse(url)).body
      @doco = ''
      @doco = REXML::Document.new(xml) unless xml.nil?
    end
    
    def render(context)
      @doco.elements
           .each('GoodreadsResponse/reviews/review') { |r| r }
           .take(@max_displayed)
           .map { |review|
                book = review.elements['book']
                authors = book.elements['authors']
                              .each_element('author') { |a| a }
                              .map { |e| e.elements['name'].text}
                              .join(' ,')

                "<div class=\"Media\">
                <img class=\"Media-figure Image\" alt=\"#{book.elements['title'].text}\" src=\"#{book.elements['small_image_url'].text}\" />
                <div class=\"Media-body\">
                    <a title=\"#{book.elements['title'].text}\" href=\"#{book.elements['link'].text}\">#{book.elements['title'].text}</a>
                <p>By #{authors} </p>
                <p class =\"text-small\"><em>Started on: #{Date.parse(review.elements['started_at'].text).strftime('%d %b %Y')}</em></p>
                </div>
                </div>"
              }.join("\n")
    end
  end
end

Liquid::Template.register_tag('goodreads', Jekyll::GoodreadsStatus)